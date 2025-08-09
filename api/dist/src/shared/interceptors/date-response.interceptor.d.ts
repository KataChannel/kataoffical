import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimezoneUtilService } from '../services/timezone-util.service';
export declare class DateResponseInterceptor implements NestInterceptor {
    private readonly timezoneUtil;
    constructor(timezoneUtil: TimezoneUtilService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private transformDatesInResponse;
    private transformDatesInObject;
    private isDateValue;
}
