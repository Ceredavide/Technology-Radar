import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-tabs.component.html'
})
export class CategoryTabs {
  @Input()
  categories!: string[];
  
  @Output() onTabChange = new EventEmitter<number>
  selectedTab: number = 0

  selectTab(index: number) {
    this.selectedTab = index
    this.onTabChange.emit(this.selectedTab)
  }

  selectTabFromSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const index = selectElement.value;
    const indexAsNumber = parseInt(index, 10);
    this.selectedTab = indexAsNumber
    this.onTabChange.emit(this.selectedTab)
  }
}