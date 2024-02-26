import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import Technology from '../../../../interfaces/Technology';
import { AlertComponent } from '../../../alert/alert.component';
import { RouterLink } from '@angular/router';

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

  isRingDescriptionOpen : boolean = false

  toggleRingDescrition(){
    this.isRingDescriptionOpen = !this.isRingDescriptionOpen
  }
}
