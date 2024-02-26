import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TechnologyService } from '../../services/technology/technology.service';
import TechnologyForm from '../../interfaces/TechnologyForm';
import { TechnologyFormComponent } from '../forms/technology-form/technology-form.component';

@Component({
  selector: 'app-technology-handler',
  standalone: true,
  imports: [
    CommonModule,
    TechnologyFormComponent
  ],
  templateUrl: './technology-handler.component.html'
})
export class TechnologyHandlerComponent implements OnInit {

  title: string = ""

  technologyId: string = ""

  technologyData: TechnologyForm | null = null

  constructor(private route: ActivatedRoute, private router: Router, private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const technologyId = params.get('id');
      if (technologyId) {
        this.technologyId = technologyId
        this.getTechnologyValues(technologyId)
      }
    });
  }

  getTechnologyValues(id: string): void {
    this.technologyService.getTechnologyById(id).subscribe(technology => {
      this.technologyData = { ...technology }
    });
  }

  handleSubmit(technologyFormData: TechnologyForm) {
    this.technologyService.editTechnology(this.technologyId, technologyFormData).subscribe();
    this.router.navigate(['/admin/dashboard'])
  }

  handleGoBack() {
    this.router.navigateByUrl('admin/dashboard')
  }

}
