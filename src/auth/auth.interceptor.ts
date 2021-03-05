import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user, method } = context.switchToHttp().getRequest();

    if (user && user.username !== 'admin' && method === 'DELETE')
      return next.handle().pipe(() => {
        throw new UnauthorizedException();
      });

    return next.handle();
  }
}
