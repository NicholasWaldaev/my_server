import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import recursivelyStripNullValues from './recursivelyStripNullValues';

@Injectable()
export class ExcludeNullInterseptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((value) => recursivelyStripNullValues(value)));
  }
}
