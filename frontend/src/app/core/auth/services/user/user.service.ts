import { Injectable } from '@angular/core';
import User from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  storeUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  getUser(): User | null {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const user: User = JSON.parse(userString);
        return user;
      }
    } catch (error) {
      console.error("Error while parsing user data from localStorage:", error);
    }
    return null;
  }

  deleteUser(){
    localStorage.removeItem("user")
  }

  checkUserRole(role: string[]) : boolean {
    const user = this.getUser()
    if(!user){
      return false
    }
    return role.includes(user.role)
  }
}
