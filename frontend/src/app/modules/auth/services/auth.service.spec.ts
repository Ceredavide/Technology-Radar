import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpStatusCode } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a signup request and return success', () => {
    const signupData = { email: 'test', company: "HSLU" , password: 'password' };
    service.signup(signupData).subscribe(res => {
      expect(res.status).toBe(HttpStatusCode.Created);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 201, statusText: 'Created' });
  });

  it('should send a login request and store the token', () => {
    const loginData = { email: 'test', password: 'password' };
    const mockToken = 'fake-token';

    service.login(loginData).subscribe(res => {
      expect(res.token).toBe(mockToken);
      expect(sessionStorage.getItem('access_token')).toBe(mockToken);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: mockToken });
  });

  it('should remove the token on logout', () => {
    sessionStorage.setItem('access_token', 'fake-token');
    service.logout();
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });

  it('should return loggedIn status', () => {
    sessionStorage.removeItem('access_token');
    expect(service.loggedIn).toBeFalse();
    sessionStorage.setItem('access_token', 'fake-token');
    expect(service.loggedIn).toBeTrue();
  });

});
