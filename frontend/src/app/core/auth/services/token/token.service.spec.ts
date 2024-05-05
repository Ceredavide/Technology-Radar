import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let store: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);

    spyOn(localStorage, 'getItem').and.callFake((key: string): string | null => {
      return key in store ? store[key] : null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => {
      store[key] = `${value}`;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
  });

  afterEach(() => {
    store = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the token in localStorage', () => {
    service.setToken('12345');
    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', '12345');
    expect(store['access_token']).toBe('12345');
  });

  it('should retrieve the token from localStorage', () => {
    store['access_token'] = '12345';
    expect(service.getToken()).toBe('12345');
    expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
  });

  it('should remove the token from localStorage', () => {
    store['access_token'] = '12345';
    service.clearToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(service.getToken()).toBeNull();
  });
});
