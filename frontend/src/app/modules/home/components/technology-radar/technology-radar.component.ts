import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import Technology from '../../../../shared/interfaces/Technology';
import TechnologyViewer from '../../../../shared/interfaces/TechnologyViewer';

import { HomeService } from '../../services/home.service';

import { ScreenComponent } from '../../../../shared/components/screen/screen.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { TechnologyViewerComponent } from '../../../../shared/components/technology-viewer/technology-viewer.component';
import { TechnologyCardComponent } from '../../../../shared/components/technology-card/technology-card.component';

@Component({
  selector: 'app-technology-radar',
  standalone: true,
  imports: [
    TechnologyViewerComponent,
    TechnologyCardComponent,
    ScreenComponent,
    AlertComponent,
    CommonModule
  ],
  templateUrl: './technology-radar.component.html'
})

export class TechnologyRadarComponent implements OnInit {

  technologyRadar : TechnologyViewer[] = [];

  selectedTechnologies: Technology[] = []

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.fetchPublishedTechnologies().subscribe(technologies => {
      this.technologyRadar = technologies;
    });
  }

  setTechnologies(technologies : Technology[]){
    this.selectedTechnologies = technologies
  }
}
