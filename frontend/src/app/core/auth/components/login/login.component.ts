import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth/auth.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  error: HttpErrorResponse | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  getErrorState(fieldName: string) {
    const descriptionControl = this.loginForm.get(fieldName);
    return descriptionControl?.errors && descriptionControl?.touched;
  }

  tryLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
          return void 0;
        },
        error: (error: HttpErrorResponse) => this.error = error.error.message || 'Unknown error'
      });
    }
  }
}
