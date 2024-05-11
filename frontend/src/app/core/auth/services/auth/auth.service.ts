import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import loginData from '../../interfaces/loginData';
import { UserData } from '../../interfaces/User';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // TODO: Implement environment variables
  apiUrl = 'http://localhost:80/api/auth';

  constructor(private http: HttpClient, private userService: UserService, private tokenService: TokenService) { }

  login(loginForm: loginData): Observable<UserData> {
    return this.http.post<UserData>(`${this.apiUrl}/login`, loginForm).pipe(
      tap(res => {
        this.tokenService.setToken(res.token);
        this.userService.storeUser(res.user);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed, please try again later'));
      })
    );
  }

  logout() {
    this.tokenService.clearToken()
    this.userService.deleteUser()
  }

  public get loggedIn(): boolean {
    return this.tokenService.getToken() !== null;
  }
}
