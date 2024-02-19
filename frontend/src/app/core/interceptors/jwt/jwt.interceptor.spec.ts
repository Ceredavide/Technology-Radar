import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';
import { jwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let request: HttpRequest<any>;
  const next: HttpHandlerFn = req => of({} as HttpEvent<unknown>);

  beforeEach(() => {
    request = new HttpRequest('GET', '/test');
    localStorage.clear();
  });

  it('should add an Authorization header if token exists', () => {
    const token = 'test-token';
    localStorage.setItem('access_token', token);

    const spyNext = jasmine.createSpy('next').and.callFake(next);

    jwtInterceptor(request, spyNext).subscribe();

    expect(spyNext).toHaveBeenCalled();
    const modifiedReq = spyNext.calls.first().args[0];
    expect(modifiedReq.headers.has('Authorization')).toBeTrue();
    expect(modifiedReq.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add an Authorization header if token does not exist', () => {
    const spyNext = jasmine.createSpy('next').and.callFake(next);

    jwtInterceptor(request, spyNext).subscribe();

    expect(spyNext).toHaveBeenCalled();
    const modifiedReq = spyNext.calls.first().args[0];
    expect(modifiedReq.headers.has('Authorization')).toBeFalse();
  });
});
