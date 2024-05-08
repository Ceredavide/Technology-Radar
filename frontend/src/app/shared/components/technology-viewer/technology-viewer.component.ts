import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import TechnologyViewer from '../../interfaces/TechnologyViewer';
import Technology from '../../interfaces/Technology';
import Ring from '../../interfaces/Ring';

import { RingTechnologies } from './components/ring-technologies/ring-technologies.component';
import { CategoryTabs } from './components/category-tabs/category-tabs.component';

@Component({
  selector: 'technology-viewer',
  standalone: true,
  imports: [RingTechnologies, CategoryTabs],
  templateUrl: './technology-viewer.component.html'
})
export class TechnologyViewerComponent implements OnInit, OnChanges {
  @Input() technologyRadar: TechnologyViewer[] = [];
  @Output() technologiesChanged = new EventEmitter<Technology[]>();

  categories: string[] = [];
  selectedRings: Ring[] = [];
  selectedCategoryIndex = 0;
  selectedRingIndex = 0;
  selectedTechnologies: Technology[] = [];

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technologyRadar']) {
      this.refreshData();
    }
  }

  refreshData(): void {
    this.updateCategories();
    this.updateSelections();
  }

  updateCategories(): void {
    this.categories = this.technologyRadar.map(category => category.category);
  }

  updateSelections(): void {
    this.selectedRings = this.technologyRadar[this.selectedCategoryIndex]?.rings || [];
    this.selectedTechnologies = this.selectedRings[this.selectedRingIndex]?.technologies || [];
    this.technologiesChanged.emit(this.selectedTechnologies);
  }

  categoryChange(index: number): void {
    this.selectedCategoryIndex = index;
    this.updateSelections();
  }

  ringChange(index: number): void {
    this.selectedRingIndex = index;
    this.updateSelections();
  }
}
