import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import loginData from '../../interfaces/loginData';
import { UserData } from '../../interfaces/User';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'http://localhost:80/api/auth';

  constructor(private http: HttpClient, private userService: UserService) { }

  login(loginForm: loginData): Observable<UserData> {
    return this.http.post<UserData>(`${this.apiUrl}/login`, loginForm ).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.token);
        this.userService.storeUser(res.user)
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userService.deleteUser()
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
