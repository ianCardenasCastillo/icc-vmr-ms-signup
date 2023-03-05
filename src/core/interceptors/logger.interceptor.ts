import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  LoggerService,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, originalUrl: url } = req;
    this.logger.log(`REQUEST: ${method} ${url}`);

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const responseTime = Date.now() - now;
        this.logger.log(`RESPONSE: ${method} ${url} ${res.statusCode} ${responseTime}ms`, JSON.stringify(data));
        return data;
      }),
    );
  }
}
