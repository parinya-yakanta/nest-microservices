import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: any): Observable<any> {
    return throwError(() => ({
      status: 'error',
      message: exception.message || 'Internal error',
    }));
  }
}
