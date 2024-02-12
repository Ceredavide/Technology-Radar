import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ApiService } from '../../api.service'

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './technology.component.html'
})
export class TechnologyComponent implements OnInit {

  technologyForm: FormGroup;

  categories: any[] = [];
  rings: any[] = [];

  result: any;
  error: any;

  constructor(private apiService: ApiService) {
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
    this.apiService.fetchCategoriesOptions().pipe(
      catchError(error => {
        this.error = error;
        console.error('An error ocurred while fetching category options:', error);
        return of([]);
      })
    ).subscribe(categories => {
      this.categories = Object.entries(categories);
    });

    this.apiService.fetchRingOptions().pipe(
      catchError(error => {
        this.error = error;
        console.error('An error ocurred while fetching ring options:', error);
        return of([]);
      })
    ).subscribe(rings => {
      this.rings = Object.entries(rings);
    });
  }

  sendForm() {
    this.technologyForm.markAllAsTouched();
    console.log(this.technologyForm.errors)
    if (this.technologyForm.valid) {
      this.apiService.sendForm(this.technologyForm.value).subscribe({
        next: (result) => {
          console.log(result)
          this.result = result
        },
        error: (error) => this.error = error
      });
    }
  }
}
