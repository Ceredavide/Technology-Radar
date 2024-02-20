import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import signupData from '../../interfaces/signupData';
import { HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertComponent
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  signUpForm: FormGroup;

  response: HttpResponse<HttpStatusCode.Created> | null = null;
  error: HttpErrorResponse | null = null;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      company: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl("", [Validators.required])
    }, { validators: this.passwordMatchValidator })
  }

  trySignUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {

      const signupForm : signupData = {
        email: this.signUpForm.get("email")?.value,
        company: this.signUpForm.get("company")?.value,
        password: this.signUpForm.get("password")?.value
      }

      this.authService.signup(signupForm).subscribe({
        next: (response : HttpResponse<HttpStatusCode.Created>) => this.response = response,
        error: (error) => this.error = error
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

}
