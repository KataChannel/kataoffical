import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheController } from './cache.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [CacheController],
  providers: [],
})
export class CacheModule {}
