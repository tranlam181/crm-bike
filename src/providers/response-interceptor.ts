import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs';
import "rxjs/add/operator/do"
import EVENTS from '../config/EVENTS';

/*
  Generated class for the ResponseInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResponseInterceptorProvider implements HttpInterceptor {

  constructor(public events: Events) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {

    }, (err: any) => {
      // console.log("Chay qua intercept", err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          this.events.publish(EVENTS.USER_UNAUTHORIZED)
        }
      }
    })
  }
}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorProvider, multi: true }
  ]
})
export class InterceptorModule { }