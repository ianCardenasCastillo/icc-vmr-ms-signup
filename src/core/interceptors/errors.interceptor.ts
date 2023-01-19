import {
  isMongoError,
  getMessageFromCodeError,
} from '@core/utils/errors/mongoose.error';
import {
  Logger,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
  RequestTimeoutException
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const message = isMongoError(err)
          ? getMessageFromCodeError(err.code)
          : err.message;
        const cause = isMongoError(err)
          ? { code: err.code, keyValue: err.keyValue }
          : err
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message,
                cause,
                description: err.name
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
/*
  constructor(
    response: string | Record<string, any>, 
    status: number, 
    options?: HttpExceptionOptions
  );
 */
