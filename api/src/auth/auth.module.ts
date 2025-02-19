import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // Đặt secret key
      signOptions: { expiresIn: '1h' }, // Cấu hình thời gian hết hạn
    }),
  ],
})
export class AuthModule {}
