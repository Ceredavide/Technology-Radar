import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import { UserData } from '../../interfaces/User';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jasmine.SpyObj<AuthService>;
    let router: Router;

    beforeEach(async () => {
        authService = jasmine.createSpyObj('AuthService', ['login']);

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                LoginComponent,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: AuthService, useValue: authService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.loginForm.valid).toBeFalsy();
    });

    it('email field validity', () => {
        const email = component.loginForm.controls['email'];
        expect(email.valid).toBeFalsy();
        email.setValue("");
        expect(email.hasError('required')).toBeTruthy();
        email.setValue("test@example.com");
        expect(email.hasError('required')).toBeFalsy();
        expect(email.hasError('email')).toBeFalsy();
    });

    it('password field validity', () => {
        const password = component.loginForm.controls['password'];
        expect(password.valid).toBeFalsy();
        password.setValue("");
        expect(password.hasError('required')).toBeTruthy();
        password.setValue("12345");
        expect(password.hasError('required')).toBeFalsy();
    });

    it('should call authService.login() if form is valid', () => {
        authService.login.and.returnValue(of({
            user: {
                userName: 'test',
                company: 'example',
                email: 'ggªhslu.ch',
                role: 'CTO'
            },
            token: 'token'
        } as UserData));
        component.loginForm.controls['email'].setValue('test@example.com');
        component.loginForm.controls['password'].setValue('12345678');
        component.tryLogin();
        expect(authService.login.calls.any()).toBeTrue();
    });

    it('should navigate to "/dashboard" on successful login', () => {
        const navigateSpy = spyOn(router, 'navigateByUrl');
        authService.login.and.returnValue(of({
            user: {
                userName: 'test',
                company: 'example',
                email: 'ggªhslu.ch',
                role: 'CTO'
            },
            token: 'token'
        } as UserData));
        component.loginForm.controls['email'].setValue('test@example.com');
        component.loginForm.controls['password'].setValue('12345678');
        component.tryLogin();
        expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
    });
});
