import { registerEnumType } from '@nestjs/graphql';

// Prisma Enums
export enum AuditAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ACCESS = 'ACCESS',
  IMPORT = 'IMPORT',
}

export enum StatusDonhang {
  DADAT = 'dadat',
  DAGIAO = 'dagiao',
  DANHAN = 'danhan',
  HUY = 'huy',
  HOANTHANH = 'hoanthanh',
}

// Register enums with GraphQL
registerEnumType(AuditAction, {
  name: 'AuditAction',
  description: 'Các hành động audit có thể thực hiện',
});

registerEnumType(StatusDonhang, {
  name: 'StatusDonhang',
  description: 'Trạng thái đơn hàng',
});
