import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ScreenComponent } from '../../../../shared/components/screen/screen.component';
import { UserService } from '../../../../core/auth/services/user/user.service';

const CTO_ROLE = 'Chief Technology Officer';

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
export class AdminScreenComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.checkAdminRole();
  }

  private checkAdminRole(): void {
    try {
      this.isAdmin = this.userService.hasRole([CTO_ROLE]);
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  }
}
