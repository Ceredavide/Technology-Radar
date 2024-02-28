import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import User from '../../../../../core/auth/interfaces/User';

import { UserService } from '../../../../../core/auth/services/user/user.service';
import { AuthService } from '../../../../../core/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  userData: User | null

  isAdmin : boolean = false

  isMobileMenuOpen: boolean = false

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
    this.userData = this.userService.getUser()
    this.isAdmin = this.userService.hasRole(["Chief Technology Officer", "Tech Lead"])
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  logOut(){
    this.authService.logout()
    this.router.navigateByUrl("auth/login")
  }
}
