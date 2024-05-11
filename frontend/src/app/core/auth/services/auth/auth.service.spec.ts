import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import  LoginData from '../../interfaces/loginData';
import { UserData } from '../../interfaces/User';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let userService: jasmine.SpyObj<UserService>;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['storeUser', 'deleteUser']);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['setToken', 'clearToken', 'getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should post user data, store token, and user data', () => {
    const mockLoginData: LoginData = { email: 'testuser', password: 'testpass' };
    const mockResponse: UserData = { user: { userName: 'Test User', company: "HSLU", email: "gg@hslu.ch", role: "CTO" }, token: '123456' };

    service.login(mockLoginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(tokenService.setToken).toHaveBeenCalledWith('123456');
      expect(userService.storeUser).toHaveBeenCalledWith(mockResponse.user);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('logout should clear token and user data', () => {
    service.logout();
    expect(tokenService.clearToken).toHaveBeenCalled();
    expect(userService.deleteUser).toHaveBeenCalled();
  });

  it('loggedIn should return true when token exists', () => {
    tokenService.getToken.and.returnValue('123456');
    expect(service.loggedIn).toBeTrue();
  });

  it('loggedIn should return false when no token exists', () => {
    tokenService.getToken.and.returnValue(null);
    expect(service.loggedIn).toBeFalse();
  });
});
