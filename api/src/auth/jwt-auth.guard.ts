import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    let request: any;

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
      console.warn('Request is undefined in JwtAuthGuard');
      return false;
    }

    // Extract token from headers
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      console.warn('No authorization header found');
      return false;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.warn('No token found in authorization header');
      return false;
    }

    try {
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      console.warn('JWT verification failed:', error.message);
      return false;
    }
  }
}
