import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CreateByInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    if (request.user?.id) {
      // Gán createdBy vào body của request
      if (!request.body.createdBy) {
        request.body.createdBy = request.user.id;
      }
    }

    return next.handle();
  }
}
