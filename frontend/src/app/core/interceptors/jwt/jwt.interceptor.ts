import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const jwtInterceptor : HttpInterceptorFn = (request: HttpRequest<any>, next : HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    let token = sessionStorage.getItem('access_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next(request)
  }