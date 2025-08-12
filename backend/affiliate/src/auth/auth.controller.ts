import { Controller, Post, Body, UseGuards, Req, Get, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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



  // @Post('register')
  // register(@Body() body: { email: string; password: string; name: string }) {
  //   return this.authService.register(body.email, body.password);
  // }
  @Post('register')
  async register(@Body() data: any) {
    try {
      const user = await this.authService.register(data, data.affiliateCode);
      return { statusCode: HttpStatus.CREATED, message: 'Đăng ký thành công', user };
    } catch (error) {      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('registerctv')
  async registerctv(@Body() data: any) {
    try {
      const user = await this.authService.registerctv(data, data.affiliateCode);
      return { statusCode: HttpStatus.CREATED, message: 'Đăng ký thành công', user };
    } catch (error) {      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  login(@Body() body: {SDT:string; email: string; password: string }) {
    console.log(body);
    return this.authService.login(body.SDT, body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Req() req,
    @Body() body: { newpass: string; oldpass: string },
  ) {
    const result = await this.authService.changePassword(req.user.id, body.oldpass, body.newpass);
    return { statusCode: HttpStatus.OK, message: 'Cập Nhật Thành Công', result };
  }

  @UseGuards(JwtAuthGuard)
  @Post('random-password')
  async randomPassword(@Req() req) {
    return this.authService.generateRandomPassword(req.user.id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email?: string; phone?: string }) {
    try {
      const result = await this.authService.forgotPassword(body.email, body.phone);
      return { statusCode: HttpStatus.OK, message: 'Link đặt lại mật khẩu đã được gửi', result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    try {
      const result = await this.authService.resetPassword(body.token, body.newPassword);
      return { statusCode: HttpStatus.OK, message: 'Mật khẩu đã được đặt lại thành công', result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
}
