import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import Technology from '../../../../shared/interfaces/Technology';

@Component({
  selector: 'technology-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technology-card.component.html'
})
export class TechnologyCardComponent {

  @Input() technology!: Technology

  isRingDescriptionOpen : boolean = false

  toggleRingDescrition(){
    this.isRingDescriptionOpen = !this.isRingDescriptionOpen
  }
}
