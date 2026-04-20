import { Injectable, NotFoundException, type CallHandler, type ExecutionContext, type NestInterceptor } from "@nestjs/common";
import { catchError, type Observable } from "rxjs";
import { EntityNotFoundError } from "src/errors/entity-not-found-error";

@Injectable()
export class EntityNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof EntityNotFoundError) {
          throw new NotFoundException(err.message || 'Entity not found.');
        }else {
          throw err;
        }
        throw err;
      })
    );
  }
}