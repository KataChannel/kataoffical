import { Controller, Post, Body, UseGuards, Req, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Audit } from 'src/auditlog/audit.decorator';
import { AuditAction } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    if (!req.user) {
      return res.redirect(`${process.env.BASE_URL}/login`);
    }
    return res.redirect(`${process.env.BASE_URL}/login?token=${req.user.token}`);
  }

  @Get('facebook')
  async facebookLogin() {}

  @Get('facebook/callback')
  facebookCallback(@Req() req, @Res() res) {
    const token = req.user.token;
    return res.redirect(`${process.env.BASE_URL}/oauth-callback?token=${token}`);
  }
  @Get('zalo')
  async zaloLogin() {}

  @Get('zalo/callback')
  zaloCallback(@Req() req, @Res() res) {
    const token = req.user.token;
    return res.redirect(`${process.env.BASE_URL}/oauth-callback?token=${token}`);
  }
  @Post('register')
  @Audit({ entity: 'Auth Register', action: AuditAction.CREATE, includeResponse: true })
  async register(@Body() data: any) {
    try {
      const user = await this.authService.register(data, data.affiliateCode);
      return { statusCode: HttpStatus.CREATED, message: 'Đăng ký thành công', user };
    } catch (error) {      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('login')
  @Audit({ entity: 'Auth Login', action: AuditAction.LOGIN, includeResponse: true })
  login(@Body() body: {SDT:string; email: string; password: string }) {
    return this.authService.login(body.SDT, body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @Audit({ entity: 'Auth Change Password', action: AuditAction.UPDATE, includeResponse: true })
  async changePassword(
    @Req() req,
    @Body() body: { newpass: string; oldpass: string },
  ) {
    const result = await this.authService.changePassword(req.user.id, body.oldpass, body.newpass);
    return { statusCode: HttpStatus.OK, message: 'Cập Nhật Thành Công', result };
  }

  @UseGuards(JwtAuthGuard)
  @Post('random-password')
  @Audit({ entity: 'Auth Random Password', action: AuditAction.CREATE, includeResponse: true })
  async randomPassword(@Req() req) {
    return this.authService.generateRandomPassword(req.user.id);
  }
  
}
