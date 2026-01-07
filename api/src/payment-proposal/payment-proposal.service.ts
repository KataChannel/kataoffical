import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
    CreatePaymentProposalDto,
    ReviewPaymentProposalDto,
} from './dto/payment-proposal.dto';

@Injectable()
export class PaymentProposalService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any) {
    const { status, tuNgay, denNgay } = filters;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (tuNgay || denNgay) {
      where.ngayLap = {};
      if (tuNgay) where.ngayLap.gte = new Date(tuNgay);
      if (denNgay) where.ngayLap.lte = new Date(denNgay);
    }

    return this.prisma.paymentProposal.findMany({
      where,
      include: {
        items: {
          include: {
            purchaseOrders: {
              include: {
                purchaseOrder: true,
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

  async findOne(id: string, prismaClient?: any) {
    const client = prismaClient || this.prisma;
    const proposal = await client.paymentProposal.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            purchaseOrders: {
              include: {
                purchaseOrder: true,
              },
            },
            paymentVoucher: true,
          },
        },
      },
    });

    if (!proposal) {
      throw new NotFoundException(
        `Không tìm thấy đề xuất thanh toán với ID: ${id}`,
      );
    }

    return proposal;
  }

  async create(createDto: CreatePaymentProposalDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Create Proposal Master
      const proposal = await tx.paymentProposal.create({
        data: {
          maDeXuat: createDto.maDeXuat,
          description: createDto.description,
          totalAmount: createDto.items.reduce(
            (sum, item) => sum + item.amount,
            0,
          ),
          paidAmount: 0,
          remainingAmount: createDto.items.reduce(
            (sum, item) => sum + item.amount,
            0,
          ),
          status: 'MOI',
        } as any,
      });

      // 2. Create Items and Links
      for (const item of createDto.items) {
        const proposalSupplier = await tx.paymentProposalSupplier.create({
          data: {
            proposalId: proposal.id,
            supplierId: item.supplierId,
            amount: item.amount,
            paidAmount: 0,
            remainingAmount: item.amount,
            status: 'CHO_THANH_TOAN',
          } as any,
        });

        for (const poId of item.purchaseOrderIds) {
          // Validate PO status
          const po = await tx.dathang.findUnique({
            where: { id: poId },
            select: { id: true, poStatus: true, madncc: true },
          });

          if (!po) {
            throw new NotFoundException(`Không tìm thấy đơn hàng ${poId}`);
          }

          if (po.poStatus !== 'DA_DOI_CHIEU') {
            throw new BadRequestException(
              `Đơn hàng ${po.madncc} chưa được Đối chiếu. Trạng thái hiện tại: ${po.poStatus || 'MOI'}`,
            );
          }

          await tx.paymentProposalPurchaseOrder.create({
            data: {
              paymentProposalSupplierId: proposalSupplier.id,
              purchaseOrderId: poId,
            },
          });
        }
      }

      return this.findOne(proposal.id, tx);
    });
  }

  async review(id: string, reviewDto: ReviewPaymentProposalDto) {
    const proposal = await this.findOne(id);

    if (proposal.status !== 'MOI') {
      throw new BadRequestException(
        'Chỉ có thể duyệt đề xuất ở trạng thái MOI',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedProposal = await tx.paymentProposal.update({
        where: { id },
        data: {
          status: reviewDto.status,
          comment: reviewDto.comment,
        },
      });

      // Nếu duyệt, cập nhật trạng thái các đơn PO liên quan
      if (reviewDto.status === 'CHO_THANH_TOAN') {
        const poIds = proposal.items.flatMap((item) =>
          item.purchaseOrders.map((po) => po.purchaseOrderId),
        );

        await tx.dathang.updateMany({
          where: {
            id: { in: poIds },
          },
          data: {
            poStatus: 'CHO_THANH_TOAN',
          },
        });
      }

      return updatedProposal;
    });
  }

  async checkAndUpdateStatus(proposalId: string) {
    const proposal = await this.prisma.paymentProposal.findUnique({
      where: { id: proposalId },
      include: {
        items: true,
      },
    });

    if (!proposal) return;

    const allPaid = proposal.items.every(
      (item) => item.status === 'DA_THANH_TOAN',
    );

    if (allPaid) {
      await this.prisma.paymentProposal.update({
        where: { id: proposalId },
        data: {
          status: 'DA_THANH_TOAN',
        },
      });
    }
  }
}
