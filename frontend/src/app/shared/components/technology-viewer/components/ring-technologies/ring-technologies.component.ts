import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import Ring from '../../../../interfaces/Ring';

import { TechnologyCardComponent } from '../../../technology-card/technology-card.component';

@Component({
  selector: 'ring-technologies',
  standalone: true,
  imports: [TechnologyCardComponent, CommonModule],
  templateUrl: './ring-technologies.component.html',
})
export class RingTechnologies {

  @Input()
  technologiesByRings!: Ring[];

  @Output() onRingChange = new EventEmitter<number>
 
  selectedRing: number = 0;

  selectRing(index: number): void {
    this.selectedRing = index;
    this.onRingChange.emit(this.selectedRing)
  }
}
