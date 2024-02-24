import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import TechnologyViewer from '../../../../shared/interfaces/TechnologyViewer';
import Technology from '../../../../shared/interfaces/Technology';

import { TechnologyViewerComponent } from '../../../../shared/components/technology-viewer/technology-viewer.component';
import { TechnologyService } from '../../services/technology/technology.service';
import { ScreenComponent } from '../../../../shared/components/screen/screen.component';
import { TechnologyCardComponent } from '../../../../shared/components/technology-card/technology-card.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-technology-publish',
  standalone: true,
  imports: [
    CommonModule,
    ScreenComponent,
    TechnologyViewerComponent,
    TechnologyCardComponent,
    AlertComponent
  ],
  templateUrl: './technology-dashboard.component.html'
})
export class TechnologyDashboardComponent implements OnInit {

  technologyRadar : TechnologyViewer[] = [];

  selectedTechnologies: Technology[] = []

  constructor(private technologyService: TechnologyService) { }

  ngOnInit() {
    this.technologyService.fetchAllTechnologies().subscribe(technologies => {
      this.technologyRadar = technologies;
    });
  }

  setTechnologies(technologies : Technology[]){
    this.selectedTechnologies = technologies
  }
  
}
