import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
    CreateARDocumentDto,
    ReviewARDocumentDto,
} from './dto/ar-document.dto';

@Injectable()
export class ARDocumentService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any) {
    const { status, tuNgay, denNgay, customerId } = filters;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (tuNgay || denNgay) {
      where.ngayLap = {};
      if (tuNgay) where.ngayLap.gte = new Date(tuNgay);
      if (denNgay) where.ngayLap.lte = new Date(denNgay);
    }

    if (customerId) {
      where.items = {
        some: {
          customerId: customerId,
        },
      };
    }

    return this.prisma.aRDocument.findMany({
      where,
      include: {
        items: {
          include: {
            customer: true,
            salesOrders: {
              include: {
                salesOrder: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const doc = await this.prisma.aRDocument.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            customer: true,
            salesOrders: {
              include: {
                salesOrder: true,
              },
            },
            receiptVoucher: true,
          },
        },
      },
    });

    if (!doc) {
      throw new NotFoundException(
        `Không tìm thấy chứng từ công nợ với ID: ${id}`,
      );
    }

    return doc;
  }

  async create(createDto: CreateARDocumentDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create AR Document Master
      const doc = await tx.aRDocument.create({
        data: {
          maChungTu: createDto.maChungTu,
          description: createDto.description,
          totalAmount: createDto.items.reduce(
            (sum, item) => sum + item.amount,
            0,
          ),
          status: 'MOI',
        },
      });

      // 2. Create Items and Links
      for (const item of createDto.items) {
        const arItem = await tx.aRDocumentItem.create({
          data: {
            arDocumentId: doc.id,
            customerId: item.customerId,
            amount: item.amount,
            status: 'CHO_THU_TIEN',
          },
        });

        for (const soId of item.salesOrderIds) {
          // Validate SO status
          const so = await tx.donhang.findUnique({
            where: { id: soId },
            select: { id: true, soStatus: true, madonhang: true },
          });

          if (!so) {
            throw new NotFoundException(`Không tìm thấy đơn hàng ${soId}`);
          }

          if (so.soStatus !== 'DA_DOI_CHIEU') {
            throw new BadRequestException(
              `Đơn hàng ${so.madonhang} chưa được Đối chiếu. Trạng thái hiện tại: ${so.soStatus || 'MOI'}`,
            );
          }

          await tx.aRDocumentDonhang.create({
            data: {
              arDocumentItemId: arItem.id,
              salesOrderId: soId,
            },
          });
        }
      }

      return this.findOne(doc.id);
    });
  }

  async review(id: string, reviewDto: ReviewARDocumentDto) {
    const doc = (await this.findOne(id)) as any;

    if (doc.status !== 'MOI') {
      throw new BadRequestException(
        'Chỉ có thể duyệt chứng từ ở trạng thái MOI',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedDoc = await tx.aRDocument.update({
        where: { id },
        data: {
          status: reviewDto.status,
          comment: reviewDto.comment,
        },
      });

      // Nếu duyệt, cập nhật trạng thái các đơn SO liên quan
      if (reviewDto.status === 'CHO_THU_TIEN') {
        const soIds = doc.items.flatMap((item) =>
          item.salesOrders.map((so) => so.salesOrderId),
        );

        await tx.donhang.updateMany({
          where: {
            id: { in: soIds },
          },
          data: {
            soStatus: 'CHO_THU_TIEN',
          },
        });
      }

      return updatedDoc;
    });
  }

  async checkAndUpdateStatus(docId: string) {
    const doc = await this.prisma.aRDocument.findUnique({
      where: { id: docId },
      include: {
        items: true,
      },
    });

    if (!doc) return;

    const allPaid = doc.items.every((item) => item.status === 'DA_THU_TIEN');

    if (allPaid) {
      await this.prisma.aRDocument.update({
        where: { id: docId },
        data: {
          status: 'DA_THU_TIEN',
        },
      });
    }
  }
}
