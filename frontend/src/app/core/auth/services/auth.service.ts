import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import loginData from '../interfaces/loginData';
import signupData from '../interfaces/signupData';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  signup(signupForm: signupData): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/auth/signup`, signupForm, { observe: "response" })
  }

  login(loginForm: loginData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, loginForm ).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
