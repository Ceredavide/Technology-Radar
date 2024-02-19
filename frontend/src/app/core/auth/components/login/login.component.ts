import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
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

  loginForm: FormGroup;

  error: HttpErrorResponse | null = null;

  router: Router;

  constructor(private authService: AuthService, router: Router) {
    this.router = router;
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  tryLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigateByUrl("home"),
        error: (error: HttpErrorResponse) => this.error = error
      })
    }
  }
}
