import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import User from '../../interfaces/User';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a user correctly', () => {
    const testUser: User = { userName: 'Test User', email: "test@hslu.ch ", company: "HSLU" ,role: 'admin' };
    service.storeUser(testUser);

    const retrievedUser = service.getUser();
    expect(retrievedUser).toEqual(testUser);
  });

  it('should return null when no user is stored', () => {
    const retrievedUser = service.getUser();
    expect(retrievedUser).toBeNull();
  });

  it('should handle errors when retrieving corrupted user data', () => {
    localStorage.setItem(service['userKey'], 'not a valid user');
    const consoleSpy = spyOn(console, 'error');

    const retrievedUser = service.getUser();
    expect(retrievedUser).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should remove user from localStorage', () => {
    const testUser: User =  { userName: 'Test User', email: "test@hslu.ch ", company: "HSLU" ,role: 'admin' };
    service.storeUser(testUser);
    service.deleteUser();

    expect(localStorage.getItem(service['userKey'])).toBeNull();
  });

  it('should return false if user does not exist and checking for roles', () => {
    const hasRole = service.hasRole(['admin']);
    expect(hasRole).toBe(false);
  });

  it('should check user role correctly', () => {
    const testUser: User = { userName: 'Test User', email: "test@hslu.ch ", company: "HSLU" ,role: 'admin' };
    service.storeUser(testUser);

    const hasAdminRole = service.hasRole(['admin']);
    const hasUserRole = service.hasRole(['user']);
    expect(hasAdminRole).toBe(true);
    expect(hasUserRole).toBe(false);
  });

});
