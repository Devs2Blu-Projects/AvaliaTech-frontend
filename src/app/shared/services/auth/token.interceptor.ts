import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const modifiedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(modifiedRequest);
    } else return next.handle(request);
  }
}
