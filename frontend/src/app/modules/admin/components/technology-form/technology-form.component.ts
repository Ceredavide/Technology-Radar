import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormService } from '../../services/form/form.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technology-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './technology-form.component.html'
})

export class TechnologyFormComponent implements OnInit {

  technologyForm: FormGroup;

  categories: [string, string][] = [];
  rings: [string, string][] = [];

  formResult: any;
  error: HttpErrorResponse | null = null;

  constructor(private formService: FormService) {
    this.technologyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('')
      }),
      ring: new FormControl(''),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.formService.fetchCategoriesOptions().subscribe({
      next: (result) => this.categories = result,
      error: (error: HttpErrorResponse) => this.error = error
    });

    this.formService.fetchRingOptions().subscribe({
      next: (result) => this.rings = result,
      error: (error: HttpErrorResponse) => this.error = error
    });
  }

  sendForm() {
    this.technologyForm.markAllAsTouched();
    if (this.technologyForm.valid) {
      this.formService.sendForm(this.technologyForm.value).subscribe({
        next: (result) => this.formResult = result,
        error: (error: HttpErrorResponse) => this.error = error
      });
    }
  }
}
