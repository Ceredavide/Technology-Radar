import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TechnologyService } from '../../services/technology/technology.service';
import { RingFormComponent } from '../ring-form/ring-form.component';
import RingForm from '../../interfaces/RingForm';

@Component({
  selector: 'app-ring-handler',
  standalone: true,
  imports: [
    CommonModule,
    RingFormComponent
  ],
  templateUrl: './ring-handler.component.html'
})
export class RingHandlerComponent implements OnInit {

  title: string = ""

  technologyId: string = ""
  ringFormData: RingForm | null = null;

  action: string = "edit";

  constructor(private route: ActivatedRoute, private router: Router, private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.action = this.route.snapshot.url[2]?.path
      const technologyId = params.get('id');
      if (technologyId) {
        this.technologyId = technologyId
        this.getRingValues(technologyId);
      }
    });
  }

  getRingValues(id: string): void {
    this.technologyService.getTechnologyById(id).subscribe(technology => {
      this.ringFormData = {
        ring: technology.ring,
        descriptionCategorization: technology.descriptionCategorization
      }
      this.setTitle(technology.name)
    }
    );
  }

  handleSubmit(ringFormData: RingForm) {
    switch (this.action) {
      case "publish":
        this.technologyService.publishTechnology(this.technologyId, ringFormData).subscribe(res => {
          this.router.navigate(['/admin/dashboard']);
        })
    }
  }

  handleGoBack() {
    this.router.navigateByUrl('admin/dashboard')
  }

  setTitle(technologyName : string){
    switch(this.action){
      case "publish":
        this.title=`Publish: Technology ${technologyName}`
        break;
      case "edit":
        this.title=`Edit Ring: Technology ${technologyName}`
        break;
    }
  }
}
