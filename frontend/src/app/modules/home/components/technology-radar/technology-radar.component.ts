import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';
import TechnologyRadar, { Ring } from '../../interfaces/TechnologyRadar';
import { CategoryTabs } from '../category-tabs/category-tabs.component';
import { RingTechnologies } from '../ring-technologies/ring-technologies.component';
import { ScreenComponent } from '../../../../shared/components/screen/screen.component';

@Component({
  selector: 'app-technology-radar',
  standalone: true,
  imports: [
    CategoryTabs,
    ScreenComponent,
    RingTechnologies
  ],
  templateUrl: './technology-radar.component.html'
})

export class TechnologyRadarComponent implements OnInit {

  technologyRadar : TechnologyRadar[] = [];

  categories: string[] = []

  technologiesByRings: Ring[] = []

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.fetchPublishedTechnologies().subscribe(technologies => {
      this.technologyRadar = technologies;
      this.categories = technologies.map(technology => technology.category)
      this.technologiesByRings = this.technologyRadar[0].rings
    });
  }

  tabChange(index : number){
    this.technologiesByRings = this.technologyRadar[index].rings
  }
}
