import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NgxNLoggerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    let status: string;
    let response: any;
    let errors: any;

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            status = 'Succeeded';
            response = event;
          }
        },
        (error) => {
          status = 'Failed';
          errors = error;
        },
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;
        const message =
          req.method +
          ' ' +
          req.urlWithParams +
          ' ' +
          status +
          ' in ' +
          elapsedTime +
          'ms';

        this.logDetails(message);
        if (response) {
          this.logDetails(response);
        }
        if (errors) {
          this.logDetails(errors);
        }
      }),
    );
  }
  private logDetails(msg: any): void {
    console.log(
      `%c👁‍🗨 [DEBUG] Interceptor Logging @ ${new Date().toLocaleTimeString()}`,
      'background-color:#00BFFE;font-weight:bold',
      msg,
    );
  }
}
