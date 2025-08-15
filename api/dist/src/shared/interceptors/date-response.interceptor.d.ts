import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class DateResponseInterceptor implements NestInterceptor {
    constructor();
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private transformDatesInResponse;
    private transformDatesInObject;
    private isDateValue;
}
