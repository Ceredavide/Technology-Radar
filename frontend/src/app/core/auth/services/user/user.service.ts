import { Injectable } from '@angular/core';
import User from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userKey = 'user';

  constructor() { }

  storeUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    try {
      const userString = localStorage.getItem(this.userKey);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error while parsing user data from localStorage:', error);
      return null;
    }
  }

  deleteUser(): void {
    localStorage.removeItem(this.userKey);
  }

  hasRole(roles: string[]): boolean {
    const user = this.getUser();
    return user ? roles.includes(user.role) : false;
  }
}
