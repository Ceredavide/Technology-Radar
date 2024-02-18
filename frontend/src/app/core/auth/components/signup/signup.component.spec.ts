import { TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupComponent } from './signup.component';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SignupComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('form should be invalid when passwords do not match', () => {
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['company'].setValue('Test Company');
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('87654321');
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.errors).toEqual({ passwordMismatch: true });
  });

  it('form should be valid when filled correctly with matching passwords', () => {
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['company'].setValue('Test Company');
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('12345678');
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('should call authService signup method if form is valid', fakeAsync(() => {
    authServiceSpy.signup.and.returnValue(of());
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['company'].setValue('Test Company');
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('12345678');
    component.trySignUp();
    tick();
    expect(authServiceSpy.signup.calls.any()).toBeTrue();
  }));

  it('should handle error on signup failure', fakeAsync(() => {
    const testError = { message: 'Signup failed' };
    authServiceSpy.signup.and.returnValue(throwError(() => testError));
    component.signUpForm.controls['email'].setValue('test@example.com');
    component.signUpForm.controls['company'].setValue('Test Company');
    component.signUpForm.controls['password'].setValue('12345678');
    component.signUpForm.controls['confirmPassword'].setValue('12345678');
    component.trySignUp();
    tick();
    expect(component.error?.message).toEqual(testError.message);
  }));
});
