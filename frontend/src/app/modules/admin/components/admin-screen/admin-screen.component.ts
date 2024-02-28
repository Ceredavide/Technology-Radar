import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ScreenComponent } from '../../../../shared/components/screen/screen.component';
import { UserService } from '../../../../core/auth/services/user/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-screen',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    ScreenComponent
  ],
  templateUrl: './admin-screen.component.html'
})
export class AdminScreenComponent {

  isAdmin : boolean = false

  constructor(private userService: UserService) {
    this.isAdmin = this.userService.hasRole(["Chief Technology Officer"])
  }
}
