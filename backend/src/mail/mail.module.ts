import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MailController } from './mail.controller';

@Module({
  controllers: [MailController],
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: parseInt(process.env.MAIL_PORT || '587'),
          secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASS,
          },
        },
        // transport: {
        //   host: configService.get<string>('MAIL_HOST'),
        //   port: configService.get<number>('MAIL_PORT'),
        //   auth: {
        //     user: configService.get<string>('MAIL_USER'),
        //     pass: configService.get<string>('MAIL_PASS'),
        //   },
        //   secure: configService.get<boolean>('MAIL_SECURE'),
        // },
        defaults: {
          from: `"No Reply" <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: path.join(__dirname, 'templates'),
          adapter: new (require('@nestjs-modules/mailer/dist/adapters/handlebars.adapter').HandlebarsAdapter)(),
          options: { strict: true },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
