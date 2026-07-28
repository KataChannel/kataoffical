import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTicketInput, UpdateTicketInput, CreateResponseInput } from './dto/support.input';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async findTickets(user: any, status?: string, priority?: string) {
    const where: any = {};
    
    if (status) where.status = status;
    if (priority) where.priority = priority;

    // If user is not admin/tech support, only show their tickets
    const userRoles = user?.roles || [];
    const isAdminOrTech = userRoles.some((r: string) => ['ADMIN', 'TECH_SUPPORT'].includes(r));
    
    if (!isAdminOrTech) {
      where.createdBy = user.id;
    }

    return (this.prisma as any).supportTicket.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            attachments: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        attachments: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findTicketById(id: string) {
    return (this.prisma as any).supportTicket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            attachments: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        attachments: true,
      },
    });
  }

  async createTicket(user: any, input: CreateTicketInput) {
    const { attachmentUrls, ...ticketData } = input;
    
    const ticket = await (this.prisma as any).supportTicket.create({
      data: {
        ...ticketData,
        createdBy: user.id,
        priority: input.priority || 'medium',
      },
    });

    // Create attachments if provided
    if (attachmentUrls && attachmentUrls.length > 0) {
      await (this.prisma as any).supportAttachment.createMany({
        data: attachmentUrls.map(url => ({
          fileUrl: url,
          fileName: url.split('/').pop() || 'file',
          fileType: this.getFileTypeFromUrl(url),
          fileSize: 0,
          ticketId: ticket.id,
        })),
      });
    }

    return this.findTicketById(ticket.id);
  }

  async updateTicket(id: string, input: UpdateTicketInput) {
    await (this.prisma as any).supportTicket.update({
      where: { id },
      data: input,
    });

    return this.findTicketById(id);
  }

  async addResponse(user: any, ticketId: string, input: CreateResponseInput) {
    const { attachmentUrls, ...responseData } = input;
    
    const response = await (this.prisma as any).supportResponse.create({
      data: {
        ...responseData,
        createdBy: user.id,
        ticketId,
      },
    });

    // Create attachments if provided
    if (attachmentUrls && attachmentUrls.length > 0) {
      await (this.prisma as any).supportAttachment.createMany({
        data: attachmentUrls.map(url => ({
          fileUrl: url,
          fileName: url.split('/').pop() || 'file',
          fileType: this.getFileTypeFromUrl(url),
          fileSize: 0,
          responseId: response.id,
        })),
      });
    }

    // Update ticket's updatedAt
    await (this.prisma as any).supportTicket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });

    return (this.prisma as any).supportResponse.findUnique({
      where: { id: response.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attachments: true,
      },
    });
  }

  async deleteTicket(id: string) {
    await (this.prisma as any).supportTicket.delete({
      where: { id },
    });
    return true;
  }

  async assignTicket(ticketId: string, technicianId: string) {
    await (this.prisma as any).supportTicket.update({
      where: { id: ticketId },
      data: {
        assignedTo: technicianId,
        status: 'inProgress',
      },
    });
    return true;
  }

  private getFileTypeFromUrl(url: string): string {
    const ext = url.split('.').pop()?.toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const videoExts = ['mp4', 'webm', 'mov'];
    
    if (imageExts.includes(ext || '')) return 'image/*';
    if (videoExts.includes(ext || '')) return 'video/*';
    return 'application/octet-stream';
  }
}
