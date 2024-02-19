import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ring } from '../../interfaces/TechnologyRadar';
import Technology from '../../../../shared/interfaces/Technology';
import { TechnologyCardComponent } from '../technology-card/technology-card.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'ring-technologies',
  standalone: true,
  imports: [TechnologyCardComponent, AlertComponent, CommonModule],
  templateUrl: './ring-technologies.component.html',
})
export class RingTechnologies implements OnChanges {
  @Input()
  technologiesByRings!: Ring[];

  selectedRing: number = 0;

  technologiesBySelectedRing: Technology[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technologiesByRings'] && this.technologiesByRings[this.selectedRing]?.technologies) {
      this.technologiesBySelectedRing = this.technologiesByRings[this.selectedRing].technologies;
    }
  }

  selectRing(index: number): void {
    this.selectedRing = index;
    this.technologiesBySelectedRing = this.technologiesByRings[index].technologies;
  }
}
