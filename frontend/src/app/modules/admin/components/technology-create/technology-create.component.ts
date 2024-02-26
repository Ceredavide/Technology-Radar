import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RingFormComponent } from '../forms/ring-form/ring-form.component';
import { TechnologyFormComponent } from '../forms/technology-form/technology-form.component';
import { FormService } from '../../services/form/form.service';
import TechnologyForm from '../../interfaces/TechnologyForm';
import FullForm from '../../interfaces/FullForm';
import RingForm from '../../interfaces/RingForm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technology-create',
  standalone: true,
  imports: [
    CommonModule,
    RingFormComponent,
    TechnologyFormComponent
  ],
  templateUrl: './technology-create.component.html'
})
export class TechnologyCreateComponent {

  stepCount: number = 0;

  technologyData: TechnologyForm = {
    name: "",
    description: "",
    category: ""
  }

  ringData: RingForm = {
    ring: "",
    descriptionCategorization: ""
  }

  constructor(private router: Router, private formService: FormService) { }

  handleTechnologySubmit(technology: TechnologyForm) {
    this.technologyData = { ...technology }
    this.stepCount = 1
  }

  handleRingSubmit(ring: RingForm) {
    this.ringData = { ...ring }

    const fullData: FullForm = { ...this.technologyData, ...this.ringData }

    this.formService.sendForm(fullData).subscribe(
      {
        next: () => this.router.navigateByUrl("admin/dashboard")
      }
    )
  }

  handleGoBack() {
    switch (this.stepCount) {
      case 0:
        this.router.navigateByUrl("admin/dashboard")
        break;
      case 1:
        this.stepCount = 0;
        break;
      default:
        this.router.navigateByUrl("admin/dashboard")
        break;
    }
  }

}
