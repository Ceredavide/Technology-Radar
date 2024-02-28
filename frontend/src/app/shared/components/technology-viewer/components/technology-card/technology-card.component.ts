import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import Technology from '../../../../interfaces/Technology';
import { AlertComponent } from '../../../alert/alert.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/auth/services/user/user.service';

@Component({
  selector: 'technology-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AlertComponent
  ],
  templateUrl: './technology-card.component.html'
})
export class TechnologyCardComponent {

  @Input() technology!: Technology

  isAdmin : boolean = false

  isRingDescriptionOpen : boolean = false

  constructor(private userService: UserService) {
    this.isAdmin = this.userService.hasRole(["Chief Technology Officer"])
  }

  formatDate(isoDate: string | undefined): string {
    if(isoDate){
      return new Date(isoDate).toLocaleString()
    }else{
      return ""
    }
  }

  toggleRingDescrition(){
    this.isRingDescriptionOpen = !this.isRingDescriptionOpen
  }
}
