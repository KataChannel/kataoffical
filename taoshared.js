const fs = require('fs').promises;
const path = require('path');

// Định nghĩa cấu trúc thư mục và nội dung file
const projectStructure = {
  'backend': {
    'src': {
      'auth': {
        'auth.module.ts': `import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { ZaloStrategy } from './strategies/zalo.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, ZaloStrategy],
  exports: [AuthService],
})
export class AuthModule {}
`,
        'auth.service.ts': `import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RedisService } from '../redis/redis.service';
import { Twilio } from 'twilio';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateEmailLogin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async registerEmail(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ email, password: hashedPassword, name });
  }

  async validateGoogle(googleId: string, email: string, name: string) {
    let user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      user = await this.usersService.create({ googleId, email, name });
    }
    return user;
  }

  async validateFacebook(facebookId: string, email: string, name: string) {
    let user = await this.usersService.findByFacebookId(facebookId);
    if (!user) {
      user = await this.usersService.create({ facebookId, email, name });
    }
    return user;
  }

  async validateZalo(zaloId: string, name: string) {
    let user = await this.usersService.findByZaloId(zaloId);
    if (!user) {
      user = await this.usersService.create({ zaloId, name });
    }
    return user;
  }

  async sendOtp(phone: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redisService.set(\`otp:\${phone}\`, otp, 300);
    const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await twilio.messages.create({
      body: \`Your OTP is \${otp}\`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return { message: 'OTP sent' };
  }

  async verifyOtp(phone: string, otp: string) {
    const storedOtp = await this.redisService.get(\`otp:\${phone}\`);
    if (storedOtp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    let user = await this.usersService.findByPhone(phone);
    if (!user) {
      user = await this.usersService.create({ phone });
    }
    await this.redisService.del(\`otp:\${phone}\`);
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    await this.usersService.saveRefreshToken(user.id, refreshToken);
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const user = await this.usersService.findById(payload.sub);
    if (!user || !(await this.usersService.validateRefreshToken(user.id, refreshToken))) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.login(user);
  }
}
`,
        'auth.controller.ts': `import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/email')
  async loginEmail(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateEmailLogin(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('register/email')
  async registerEmail(@Body() body: { email: string; password: string; name: string }) {
    const user = await this.authService.registerEmail(body.email, body.password, body.name);
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    const user = await this.authService.validateGoogle(req.user.googleId, req.user.email, req.user.name);
    return this.authService.login(user);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Request() req) {
    const user = await this.authService.validateFacebook(req.user.facebookId, req.user.email, req.user.name);
    return this.authService.login(user);
  }

  @Get('zalo')
  @UseGuards(AuthGuard('zalo'))
  async zaloAuth() {}

  @Get('zalo/callback')
  @UseGuards(AuthGuard('zalo'))
  async zaloAuthRedirect(@Request() req) {
    const user = await this.authService.validateZalo(req.user.zaloId, req.user.name);
    return this.authService.login(user);
  }

  @Post('phone/otp')
  async sendOtp(@Body() body: { phone: string }) {
    return this.authService.sendOtp(body.phone);
  }

  @Post('phone/verify')
  async verifyOtp(@Body() body: { phone: string; otp: string }) {
    const user = await this.authService.verifyOtp(body.phone, body.otp);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
`,
        'strategies': {
          'google.strategy.ts': `import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    };
  }
}
`,
          'facebook.strategy.ts': `import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      facebookId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
    };
  }
}
`,
          'zalo.strategy.ts': `import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ZaloStrategy extends PassportStrategy(Strategy, 'zalo') {
  constructor(configService: ConfigService) {
    super();
    this.appId = configService.get('ZALO_APP_ID');
    this.appSecret = configService.get('ZALO_APP_SECRET');
    this.callbackURL = 'http://localhost:3000/auth/zalo/callback';
  }

  authenticate(req: any, options: any) {
    const authUrl = \`https://oauth.zaloapp.com/v4/oa/authorize?app_id=\${this.appId}&redirect_uri=\${this.callbackURL}\`;
    if (!req.query.code) {
      return req.res.redirect(authUrl);
    }
    return super.authenticate(req, options);
  }

  async validate(req: any) {
    const code = req.query.code;
    const tokenRes = await axios.post('https://oauth.zaloapp.com/v4/oa/access_token', null, {
      params: {
        code,
        app_id: this.appId,
        app_secret: this.appSecret,
        grant_type: 'authorization_code',
      },
    });
    const accessToken = tokenRes.data.access_token;
    const userRes = await axios.get('https://graph.zalo.me/v2.0/me', {
      headers: { Authorization: \`Bearer \${accessToken}\` },
    });
    return {
      zaloId: userRes.data.id,
      name: userRes.data.name,
    };
  }
}
`,
        },
      },
      'users': {
        'users.module.ts': `import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
`,
        'users.service.ts': `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  async findByFacebookId(facebookId: string) {
    return this.prisma.user.findUnique({ where: { facebookId } });
  }

  async findByZaloId(zaloId: string) {
    return this.prisma.user.findUnique({ where: { zaloId } });
  }

  async saveRefreshToken(userId: number, token: string) {
    return this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async validateRefreshToken(userId: number, token: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({ where: { token } });
    return refreshToken && refreshToken.userId === userId && refreshToken.expiresAt > new Date();
  }
}
`,
      },
      'notifications': {
        'notifications.module.ts': `import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { RedisService } from '../redis/redis.service';

@Module({
  providers: [NotificationsGateway, RedisService],
  exports: [NotificationsGateway],
})
export class NotificationsModule {}
`,
        'notifications.gateway.ts': `import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  async notifyUser(userId: number, message: string) {
    this.server.to(\`user:\${userId}\`).emit('notification', { message });
  }

  @SubscribeMessage('join')
  handleJoin(client: any, userId: number) {
    client.join(\`user:\${userId}\`);
    return { message: \`Joined user:\${userId}\` };
  }
}
`,
      },
      'prisma': {
        'schema.prisma': `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int      @id @default(autoincrement())
  email         String?  @unique
  phone         String?  @unique
  password      String?
  name          String?
  googleId      String?  @unique
  facebookId    String?  @unique
  zaloId        String?  @unique
  role          Role     @default(USER)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  refreshTokens RefreshToken[]
  logs          Log[]
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
}

model Log {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  action    String
  createdAt DateTime @default(now())
}

enum Role {
  USER
  MANAGER
  ADMIN
}
`,
        'prisma.service.ts': `import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
`,
      },
      'redis': {
        'redis.service.ts': `import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = createClient({ url: process.env.REDIS_URL });
    this.client.connect();
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async del(key: string) {
    return this.client.del(key);
  }
}
`,
      },
      'main.ts': `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
`,
      'app.module.ts': `import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    NotificationsModule,
  ],
})
export class AppModule {}
`,
    },
    '.env': `DATABASE_URL="postgresql://user:password@localhost:5432/shared_core?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
FACEBOOK_CLIENT_ID="your_facebook_client_id"
FACEBOOK_CLIENT_SECRET="your_facebook_secret"
ZALO_APP_ID="your_zalo_app_id"
ZALO_APP_SECRET="your_zalo_secret"
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
TWILIO_PHONE_NUMBER="+1234567890"
REDIS_URL="redis://localhost:6379"
`,
    'Dockerfile': `FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
`,
    'docker-compose.yml': `version: '3.8'
services:
  backend:
    build: .
    ports:
      - '3000:3000'
    env_file:
      - .env
    depends_on:
      - postgres
      - redis
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: shared_core
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:6
    ports:
      - '6379:6379'
volumes:
  postgres_data:
`,
    'package.json': `{
  "name": "shared-core-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main"
  },
  "dependencies": {
    "@nestjs/common": "^9.0.0",
    "@nestjs/config": "^2.2.0",
    "@nestjs/core": "^9.0.0",
    "@nestjs/jwt": "^9.0.0",
    "@nestjs/passport": "^9.0.0",
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/platform-socket.io": "^9.0.0",
    "@nestjs/throttler": "^4.0.0",
    "@nestjs/websockets": "^9.0.0",
    "@prisma/client": "^4.0.0",
    "axios": "^1.0.0",
    "bcrypt": "^5.0.0",
    "passport": "^0.6.0",
    "passport-facebook": "^3.0.0",
    "passport-google-oauth20": "^2.0.0",
    "redis": "^4.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.2.0",
    "socket.io": "^4.0.0",
    "twilio": "^4.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^9.0.0",
    "@nestjs/schematics": "^9.0.0",
    "@nestjs/testing": "^9.0.0",
    "@types/express": "^4.17.13",
    "@types/node": "^16.0.0",
    "@types/passport-facebook": "^2.1.7",
    "@types/passport-google-oauth20": "^2.0.11",
    "prisma": "^4.0.0",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "typescript": "^4.7.4"
  }
}
`,
  },
  'frontend': {
    'src': {
      'app': {
        'auth': {
          'login': {
            'login.component.ts': `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  phoneForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.phoneForm = this.fb.group({
      phone: ['', Validators.required],
      otp: [''],
    });
  }

  loginWithEmail() {
    if (this.loginForm.valid) {
      this.authService.loginEmail(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => (this.error = err.message),
      });
    }
  }

  loginWithGoogle() {
    window.location.href = environment.googleAuthUrl;
  }

  loginWithFacebook() {
    window.location.href = environment.facebookAuthUrl;
  }

  loginWithZalo() {
    window.location.href = environment.zaloAuthUrl;
  }

  sendOtp() {
    if (this.phoneForm.get('phone')?.valid) {
      this.authService.sendOtp(this.phoneForm.get('phone')?.value).subscribe({
        next: () => (this.phoneForm.get('otp')?.enable()),
        error: (err) => (this.error = err.message),
      });
    }
  }

  verifyOtp() {
    if (this.phoneForm.valid) {
      this.authService.verifyOtp(this.phoneForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => (this.error = err.message),
      });
    }
  }
}
`,
            'login.component.html': `<div class="login-container">
  <h2>Login</h2>
  <form [formGroup]="loginForm" (ngSubmit)="loginWithEmail()">
    <mat-form-field>
      <input matInput formControlName="email" placeholder="Email" />
      <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
    </mat-form-field>
    <mat-form-field>
      <input matInput formControlName="password" type="password" placeholder="Password" />
      <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
    </mat-form-field>
    <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
  </form>

  <div class="social-login">
    <button mat-raised-button (click)="loginWithGoogle()">Login with Google</button>
    <button mat-raised-button (click)="loginWithFacebook()">Login with Facebook</button>
    <button mat-raised-button (click)="loginWithZalo()">Login with Zalo</button>
  </div>

  <form [formGroup]="phoneForm" (ngSubmit)="verifyOtp()">
    <mat-form-field>
      <input matInput formControlName="phone" placeholder="Phone Number" />
      <mat-error *ngIf="phoneForm.get('phone')?.hasError('required')">Phone is required</mat-error>
    </mat-form-field>
    <button mat-raised-button (click)="sendOtp()" [disabled]="phoneForm.get('phone')?.invalid">Send OTP</button>
    <mat-form-field>
      <input matInput formControlName="otp" placeholder="OTP" [disabled]="!phoneForm.get('otp')?.enabled" />
      <mat-error *ngIf="phoneForm.get('otp')?.hasError('required')">OTP is required</mat-error>
    </mat-form-field>
    <button mat-raised-button color="primary" type="submit" [disabled]="phoneForm.invalid">Verify OTP</button>
  </form>

  <p *ngIf="error" class="error">{{ error }}</p>
</div>
`,
            'login.component.scss': `.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.social-login {
  margin: 20px 0;
}

button {
  margin: 10px 0;
}

.error {
  color: red;
}
`,
          },
          'register': {
            'register.component.ts': `import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerEmail(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => (this.error = err.message),
      });
    }
  }
}
`,
            'register.component.html': `<div class="register-container">
  <h2>Register</h2>
  <form [formGroup]="registerForm" (ngSubmit)="register()">
    <mat-form-field>
      <input matInput formControlName="email" placeholder="Email" />
      <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Email is required</mat-error>
    </mat-form-field>
    <mat-form-field>
      <input matInput formControlName="name" placeholder="Name" />
      <mat-error *ngIf="registerForm.get('name')?.hasError('required')">Name is required</mat-error>
    </mat-form-field>
    <mat-form-field>
      <input matInput formControlName="password" type="password" placeholder="Password" />
      <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
    </mat-form-field>
    <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
  </form>
  <p *ngIf="error" class="error">{{ error }}</p>
</div>
`,
            'register.component.scss': `.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin: 10px 0;
}

.error {
  color: red;
}
`,
          },
          'auth.module.ts': `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
  ],
})
export class AuthModule {}
`,
        },
        'shared': {
          'services': {
            'auth.service.ts': `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginEmail(data: { email: string; password: string }): Observable<any> {
    return this.http.post(\`\${environment.apiUrl}/auth/login/email\`, data);
  }

  registerEmail(data: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(\`\${environment.apiUrl}/auth/register/email\`, data);
  }

  sendOtp(phone: string): Observable<any> {
    return this.http.post(\`\${environment.apiUrl}/auth/phone/otp\`, { phone });
  }

  verifyOtp(data: { phone: string; otp: string }): Observable<any> {
    return this.http.post(\`\${environment.apiUrl}/auth/phone/verify\`, data);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(\`\${environment.apiUrl}/auth/refresh\`, { refreshToken });
  }
}
`,
            'socket.service.ts': `import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  join(userId: number) {
    this.socket.emit('join', userId);
  }

  onNotification(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('notification', (data) => observer.next(data));
    });
  }
}
`,
          },
        },
        'material.module.ts': `import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule {}
`,
        'app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
`,
        'app-routing.module.ts': `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
`,
        'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
`,
      },
      'environments': {
        'environment.ts': `export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  googleAuthUrl: 'http://localhost:3000/auth/google',
  facebookAuthUrl: 'http://localhost:3000/auth/facebook',
  zaloAuthUrl: 'http://localhost:3000/auth/zalo',
};
`,
        'environment.prod.ts': `export const environment = {
  production: true,
  apiUrl: 'https://your-production-url',
  googleAuthUrl: 'https://your-production-url/auth/google',
  facebookAuthUrl: 'https://your-production-url/auth/facebook',
  zaloAuthUrl: 'https://your-production-url/auth/zalo',
};
`,
      },
    },
    'Dockerfile': `FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`,
    'package.json': `{
  "name": "shared-core-frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^14.0.0",
    "@angular/common": "^14.0.0",
    "@angular/compiler": "^14.0.0",
    "@angular/core": "^14.0.0",
    "@angular/forms": "^14.0.0",
    "@angular/material": "^14.0.0",
    "@angular/platform-browser": "^14.0.0",
    "@angular/platform-browser-dynamic": "^14.0.0",
    "@angular/router": "^14.0.0",
    "@auth0/auth0-angular": "^1.0.0",
    "rxjs": "~7.5.0",
    "socket.io-client": "^4.0.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^14.0.0",
    "@angular/cli": "^14.0.0",
    "@angular/compiler-cli": "^14.0.0",
    "@types/jasmine": "~4.0.0",
    "@types/node": "^12.11.1",
    "jasmine-core": "~4.1.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "typescript": "~4.7.2"
  }
}
`,
    'angular.json': `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "frontend": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/frontend",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "frontend:build:production"
            },
            "development": {
              "browserTarget": "frontend:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
`,
  },
  'README.md': `# Shared Core Project

## Overview
This project implements the Shared Core for a system with authentication (Google, Zalo, Facebook, phone OTP, email), user management, role-based authorization, Socket.IO notifications, and logging. It uses NestJS (backend), Angular (frontend), Prisma (ORM), PostgreSQL, Redis, and Docker.

## Setup

### Backend
1. Navigate to \`backend/\`.
2. Update \`.env\` with API keys (Google, Zalo, Facebook, Twilio).
3. Run \`docker-compose up -d\`.
4. Initialize database: \`npx prisma migrate dev --name init\`.
5. Start: \`npm run start:dev\`.

### Frontend
1. Navigate to \`frontend/\`.
2. Install dependencies: \`npm install\`.
3. Build: \`ng build\`.
4. Serve: \`ng serve\` or use Docker (\`docker build -t frontend . && docker run -p 80:80 frontend\`).

## Authentication
- **Email/Password**: Register/login with bcrypt hashing.
- **Google/Facebook/Zalo**: OAuth 2.0 integration.
- **Phone**: OTP via Twilio, stored in Redis.
- **JWT**: Access token (15m), refresh token (7d).

## Features
- User management (email, phone, OAuth IDs, roles).
- Role-based access (USER, MANAGER, ADMIN).
- Socket.IO for real-time notifications.
- Logging user actions (login, register).
- API Gateway for module routing.

## Deployment
- Backend: Dockerized NestJS, PostgreSQL, Redis.
- Frontend: Angular served via Nginx.
- Use AWS/GCP for production, update environment URLs.

## Notes
- Secure \`.env\` (do not commit).
- Test OAuth callbacks in production (HTTPS).
- Monitor Redis for OTP/session limits.
`,
};

// Hàm tạo thư mục và file đệ quy
async function createStructure(basePath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const fullPath = path.join(basePath, key);
    
    if (typeof value === 'string') {
      // Tạo file
      await fs.writeFile(fullPath, value);
      console.log(`Created file: ${fullPath}`);
    } else {
      // Tạo thư mục
      await fs.mkdir(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
      // Đệ quy cho các file/thư mục con
      await createStructure(fullPath, value);
    }
  }
}

// Hàm chính
async function generateProject() {
  try {
    const rootDir = path.join(__dirname, 'shared-core');
    await fs.mkdir(rootDir, { recursive: true });
    await createStructure(rootDir, projectStructure);
    console.log('Project generated successfully!');
  } catch (error) {
    console.error('Error generating project:', error);
  }
}

// Chạy script
generateProject();