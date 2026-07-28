import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  canActivate(context: ExecutionContext): boolean {
    let request: any;

    try {
      // Check if this is a GraphQL context
      if (context.getType<any>() === 'graphql') {
        const gqlContext = GqlExecutionContext.create(context);
        request = gqlContext.getContext().req;
      } else {
        // HTTP context
        request = context.switchToHttp().getRequest();
      }

      // Handle case where request is undefined
      if (!request) {
        throw new UnauthorizedException('Request context not available');
      }

      // Extract token from headers
      const authHeader = request.headers?.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('No authorization header found');
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token found in authorization header');
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
