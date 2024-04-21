// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of, throwError } from 'rxjs';
// import { Router } from '@angular/router';

// import { LoginComponent } from './login.component';
// import { AuthService } from '../../services/auth/auth.service';
// import { UserData } from '../../interfaces/User';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authServiceSpy: jasmine.SpyObj<AuthService>;
//   let router: Router;

//   const mockUserData: UserData = { token: "gggggg", user: { userName: "gg", email: "test@hslu.ch", role: "tester", company: "HSLU" } }

//   beforeEach(async () => {
//     authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule,LoginComponent],
//       providers: [
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();
  
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('form should be invalid when empty', () => {
//     expect(component.loginForm.valid).toBeFalsy();
//   });

//   it('form should be valid when filled correctly', () => {
//     component.loginForm.controls['email'].setValue('test@example.com');
//     component.loginForm.controls['password'].setValue('123456');
//     expect(component.loginForm.valid).toBeTruthy();
//   });

//   it('should call authService login method if form is valid', fakeAsync(() => {
//     authServiceSpy.login.and.returnValue(of(mockUserData));
//     component.loginForm.controls['email'].setValue('test@example.com');
//     component.loginForm.controls['password'].setValue('123456');
//     component.tryLogin();
//     tick();
//     expect(authServiceSpy.login.calls.any()).toBeTrue();
//   }));

//   it('should navigate to home on successful login', fakeAsync(() => {
//     authServiceSpy.login.and.returnValue(of(mockUserData));
//     component.loginForm.controls['email'].setValue('test@example.com');
//     component.loginForm.controls['password'].setValue('123456');
//     component.tryLogin();
//     tick();
//     expect(router.navigateByUrl).toHaveBeenCalledWith('home');
//   }));

//   it('should display error message on login failure', fakeAsync(() => {
//     const testError = { message: 'Test error' };
//     authServiceSpy.login.and.returnValue(throwError(() => testError));
//     component.loginForm.controls['email'].setValue('test@example.com');
//     component.loginForm.controls['password'].setValue('123456');
//     component.tryLogin();
//     tick();
//     expect(component.error?.message).toEqual(testError.message);
//   }));
// });
