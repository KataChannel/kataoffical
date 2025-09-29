import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Xóa dữ liệu cũ (nếu có) để đảm bảo database trống
    // await prisma.thanhToanHoaHong.deleteMany({});
    // await prisma.hoaHong.deleteMany({});
    // await prisma.doanhthu.deleteMany({});
    // await prisma.doanhso.deleteMany({});
    // await prisma.dichvu.deleteMany({});
    // await prisma.trackingEvent.deleteMany({});
    // await prisma.affiliateLink.deleteMany({});
    // await prisma.landingPage.deleteMany({});
    // await prisma.notification.deleteMany({});
    // await prisma.auditLog.deleteMany({});
    // await prisma.errorLog.deleteMany({});
    // await prisma.chatAIHistory.deleteMany({});
    // await prisma.chatAIMessage.deleteMany({});
    // await prisma.menu.deleteMany({});
    // await prisma.rolePermission.deleteMany({});
    // await prisma.userRole.deleteMany({});
    // await prisma.permission.deleteMany({});
    // await prisma.role.deleteMany({});
    // await prisma.user.deleteMany({});
    // await prisma.fileManager.deleteMany({});
    // await prisma.resource.deleteMany({});

    // 1. Thêm dữ liệu cho Role
    await prisma.role.createMany({
      data: [
        {
          id: 'role1',
          name: 'User',
          createdAt: new Date('2025-06-01T08:00:00Z'),
          updatedAt: new Date('2025-06-01T08:00:00Z'),
        },
      ],
    });

    // 2. Thêm dữ liệu cho Permission
    await prisma.permission.createMany({
      data: [
        {
          id: 'permission1',
          name: 'view_services',
          description: 'View service details',
          createdAt: new Date('2025-06-01T08:00:00Z'),
          updatedAt: new Date('2025-06-01T08:00:00Z'),
        },
      ],
    });

    // 3. Thêm dữ liệu cho RolePermission
    await prisma.rolePermission.createMany({
      data: [
        {
          id: 'rolePermission1',
          roleId: 'role1',
          permissionId: 'permission1',
        },
      ],
    });

    // 4. Thêm dữ liệu cho User
    await prisma.user.createMany({
      data: [
        {
          id: 'user1',
          codeId: 'USER001',
          name: 'Nguyen Van A',
          email: 'user1@example.com',
          gender: 'MALE',
          phone: '0901234567',
          isActive: true,
          createdAt: new Date('2025-06-01T08:00:00Z'),
          updatedAt: new Date('2025-06-01T08:00:00Z'),
          affiliateCode: 'AFF_USER1',
        },
        {
          id: 'user2',
          codeId: 'USER002',
          name: 'Tran Thi B',
          email: 'user2@example.com',
          gender: 'FEMALE',
          phone: '0901234568',
          isActive: true,
          createdAt: new Date('2025-06-01T08:00:00Z'),
          updatedAt: new Date('2025-06-01T08:00:00Z'),
          affiliateCode: 'AFF_USER2',
        },
      ],
    });

    // 5. Thêm dữ liệu cho UserRole
    await prisma.userRole.createMany({
      data: [
        { id: 'userRole1', userId: 'user1', roleId: 'role1' },
        { id: 'userRole2', userId: 'user2', roleId: 'role1' },
      ],
    });

    // 6. Thêm dữ liệu cho LandingPage
    await prisma.landingPage.createMany({
      data: [
        {
          id: 'landing1',
          title: 'Dịch vụ chăm sóc sắc đẹp',
          slug: 'cham-soc-sac-dep',
          description: 'Trang giới thiệu các dịch vụ chăm sóc da',
          status: 'published',
          codeId: 'LP001',
          ownerId: 'user1',
          createdAt: new Date('2025-06-01T09:00:00Z'),
          updatedAt: new Date('2025-06-01T09:00:00Z'),
          order: 1,
          isActive: true,
        },
      ],
    });

    // 7. Thêm dữ liệu cho AffiliateLink
    await prisma.affiliateLink.createMany({
      data: [
        {
          id: 'affiliate1',
          codeId: 'AFF001',
          landingPageId: 'landing1',
          campaignName: 'Beauty Campaign',
          url: 'https://example.com/affiliate/001',
          isActive: true,
          createdAt: new Date('2025-06-01T09:00:00Z'),
          updatedAt: new Date('2025-06-01T09:00:00Z'),
          order: 1,
        },
      ],
    });

    // 8. Thêm dữ liệu cho Dichvu
    await prisma.dichvu.createMany({
      data: [
        {
          id: 'dichv1',
          codeId: 'DV001',
          TabCode: 'TAB001',
          TabCardCode: 'CARD001',
          TabMedicineCode: 'MED001',
          serviceCode: 'SVC001',
          serviceName: 'Chăm sóc da chuyên sâu',
          description: 'Dịch vụ chăm sóc da mặt với công nghệ cao cấp',
          price: 800000,
          createdAt: new Date('2025-06-01T10:00:00Z'),
          updatedAt: new Date('2025-06-01T10:00:00Z'),
          order: 1,
        },
        {
          id: 'dichv2',
          codeId: 'DV002',
          TabCode: 'TAB002',
          TabCardCode: 'CARD002',
          TabMedicineCode: 'MED002',
          serviceCode: 'SVC002',
          serviceName: 'Tắm trắng toàn thân',
          description: 'Dịch vụ tắm trắng giúp da sáng mịn',
          price: 1200000,
          createdAt: new Date('2025-06-02T10:00:00Z'),
          updatedAt: new Date('2025-06-02T10:00:00Z'),
          order: 2,
        },
        {
          id: 'dichv3',
          codeId: 'DV003',
          TabCode: 'TAB003',
          TabCardCode: 'CARD003',
          TabMedicineCode: 'MED003',
          serviceCode: 'SVC003',
          serviceName: 'Trị nám da',
          description: 'Dịch vụ điều trị nám da bằng laser',
          price: 1500000,
          createdAt: new Date('2025-06-03T10:00:00Z'),
          updatedAt: new Date('2025-06-03T10:00:00Z'),
          order: 3,
        },
      ],
    });

    // 9. Thêm dữ liệu cho Doanhso
    await prisma.doanhso.createMany({
      data: [
        {
          id: 'doanhso1',
          codeId: 'DS001',
          userId: 'user1',
          dichvuId: 'dichv1',
          originalAmount: 800000,
          discountAmount: 80000,
          actualAmount: 720000,
          status: 'COMPLETED',
          affiliateCode: 'AFF001',
          affiliateLinkId: 'affiliate1',
          createdAt: new Date('2025-06-04T12:00:00Z'),
          updatedAt: new Date('2025-06-04T12:00:00Z'),
          order: 1,
        },
        {
          id: 'doanhso2',
          codeId: 'DS002',
          userId: 'user2',
          dichvuId: 'dichv2',
          originalAmount: 1200000,
          discountAmount: 120000,
          actualAmount: 1080000,
          status: 'COMPLETED',
          affiliateCode: 'AFF001',
          affiliateLinkId: 'affiliate1',
          createdAt: new Date('2025-06-05T12:00:00Z'),
          updatedAt: new Date('2025-06-05T12:00:00Z'),
          order: 2,
        },
        {
          id: 'doanhso3',
          codeId: 'DS003',
          userId: 'user1',
          dichvuId: 'dichv3',
          originalAmount: 1500000,
          discountAmount: 150000,
          actualAmount: 1350000,
          status: 'COMPLETED',
          affiliateCode: 'AFF001',
          affiliateLinkId: 'affiliate1',
          createdAt: new Date('2025-06-06T12:00:00Z'),
          updatedAt: new Date('2025-06-06T12:00:00Z'),
          order: 3,
        },
      ],
    });

    // 10. Thêm dữ liệu cho Doanhthu
    await prisma.doanhthu.createMany({
      data: [
        {
          id: 'doanhthu1',
          codeId: 'DT001',
          codeDT: 'DT_CODE_001',
          dichvuId: 'dichv1',
          amount: 720000,
          commission: 72000,
          status: 'COMPLETED',
          createdAt: new Date('2025-06-04T12:30:00Z'),
          updatedAt: new Date('2025-06-04T12:30:00Z'),
          order: 1,
          completedAt: new Date('2025-06-04T13:00:00Z'),
        },
        {
          id: 'doanhthu2',
          codeId: 'DT002',
          codeDT: 'DT_CODE_002',
          dichvuId: 'dichv2',
          amount: 1080000,
          commission: 108000,
          status: 'COMPLETED',
          createdAt: new Date('2025-06-05T12:30:00Z'),
          updatedAt: new Date('2025-06-05T12:30:00Z'),
          order: 2,
          completedAt: new Date('2025-06-05T13:00:00Z'),
        },
        {
          id: 'doanhthu3',
          codeId: 'DT003',
          codeDT: 'DT_CODE_003',
          dichvuId: 'dichv3',
          amount: 1350000,
          commission: 135000,
          status: 'COMPLETED',
          createdAt: new Date('2025-06-06T12:30:00Z'),
          updatedAt: new Date('2025-06-06T12:30:00Z'),
          order: 3,
          completedAt: new Date('2025-06-06T13:00:00Z'),
        },
      ],
    });

    // 11. Thêm dữ liệu cho HoaHong
    await prisma.hoaHong.createMany({
      data: [
        {
          id: 'hoahong1',
          codeId: 'HH001',
          userId: 'user1',
          doanhthuId: 'doanhthu1',
          affiliateLinkId: 'affiliate1',
          tienhoahong: 72000,
          description: 'Hoa hồng từ doanh thu chăm sóc da',
          status: 'PAID',
          order: 1,
          createdAt: new Date('2025-06-04T13:00:00Z'),
          updatedAt: new Date('2025-06-04T13:00:00Z'),
        },
        {
          id: 'hoahong2',
          codeId: 'HH002',
          userId: 'user2',
          doanhthuId: 'doanhthu2',
          affiliateLinkId: 'affiliate1',
          tienhoahong: 108000,
          description: 'Hoa hồng từ doanh thu tắm trắng',
          status: 'PAID',
          order: 2,
          createdAt: new Date('2025-06-05T13:00:00Z'),
          updatedAt: new Date('2025-06-05T13:00:00Z'),
        },
        {
          id: 'hoahong3',
          codeId: 'HH003',
          userId: 'user1',
          doanhthuId: 'doanhthu3',
          affiliateLinkId: 'affiliate1',
          tienhoahong: 135000,
          description: 'Hoa hồng từ doanh thu trị nám',
          status: 'PAID',
          order: 3,
          createdAt: new Date('2025-06-06T13:00:00Z'),
          updatedAt: new Date('2025-06-06T13:00:00Z'),
        },
      ],
    });

    // 12. Thêm dữ liệu cho ThanhToanHoaHong
    await prisma.thanhToanHoaHong.createMany({
      data: [
        {
          id: 'thanhtoan1',
          codeId: 'TT001',
          hoaHongId: 'hoahong1',
          userId: 'user1',
          amountPaid: 72000,
          paymentMethod: 'Bank Transfer',
          order: 1,
          paymentDate: new Date('2025-06-04T14:00:00Z'),
          createdAt: new Date('2025-06-04T14:00:00Z'),
          updatedAt: new Date('2025-06-04T14:00:00Z'),
        },
        {
          id: 'thanhtoan2',
          codeId: 'TT002',
          hoaHongId: 'hoahong2',
          userId: 'user2',
          amountPaid: 108000,
          paymentMethod: 'Bank Transfer',
          order: 2,
          paymentDate: new Date('2025-06-05T14:00:00Z'),
          createdAt: new Date('2025-06-05T14:00:00Z'),
          updatedAt: new Date('2025-06-05T14:00:00Z'),
        },
        {
          id: 'thanhtoan3',
          codeId: 'TT003',
          hoaHongId: 'hoahong3',
          userId: 'user1',
          amountPaid: 135000,
          paymentMethod: 'Bank Transfer',
          order: 3,
          paymentDate: new Date('2025-06-06T14:00:00Z'),
          createdAt: new Date('2025-06-06T14:00:00Z'),
          updatedAt: new Date('2025-06-06T14:00:00Z'),
        },
      ],
    });

    // 13. Thêm dữ liệu cho AuditLog
    await prisma.auditLog.createMany({
      data: [
        {
          id: 'audit1',
          userId: 'user1',
          action: 'CREATE',
          entity: 'Doanhso',
          entityId: 'doanhso1',
          createdAt: new Date('2025-06-04T12:00:00Z'),
        },
      ],
    });

    // 14. Thêm dữ liệu cho Notification
    await prisma.notification.createMany({
      data: [
        {
          id: 'noti1',
          message: 'Hoa hồng của bạn đã được thanh toán',
          userId: 'user1',
          read: false,
          createdAt: new Date('2025-06-04T14:00:00Z'),
        },
      ],
    });

    // 15. Thêm dữ liệu cho TrackingEvent
    await prisma.trackingEvent.createMany({
      data: [
        {
          id: 'track1',
          eventType: 'CLICK',
          pageUrl: 'https://example.com/affiliate/001',
          refCode: 'AFF001',
          userId: 'user1',
          affiliateLinkId: 'affiliate1',
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0',
          createdAt: new Date('2025-06-04T11:00:00Z'),
          updatedAt: new Date('2025-06-04T11:00:00Z'),
        },
      ],
    });

    // 16. Thêm dữ liệu cho Menu (tùy chọn)
    await prisma.menu.createMany({
      data: [
        {
          id: 'menu1',
          title: 'Dịch vụ',
          slug: 'dich-vu',
          isActive: true,
          createdAt: new Date('2025-06-01T08:00:00Z'),
          updatedAt: new Date('2025-06-01T08:00:00Z'),
          order: 1,
        },
      ],
    });

    console.log('Dữ liệu demo đã được upload thành công!');
  } catch (error) {
    console.error('Lỗi khi upload dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();