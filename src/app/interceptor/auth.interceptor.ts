import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonValues } from '../constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const UUID = sessionStorage.getItem(CommonValues.authToken);

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${UUID}`
      }
    });
    return next.handle(authReq);
  }
}