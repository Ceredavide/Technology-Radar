import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormService } from '../../../services/form/form.service'
import { HttpErrorResponse } from '@angular/common/http';
import TechnologyForm from '../../../interfaces/TechnologyForm';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-technology-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertComponent
  ],
  templateUrl: './technology-form.component.html'
})

export class TechnologyFormComponent implements OnInit, OnChanges {

  @Input()
  technologyData: TechnologyForm | null = null

  @Output()
  handleSubmit = new EventEmitter<any>();

  @Output()
  handleGoBack = new EventEmitter<TechnologyForm>();

  title: string = "Add a new Technology"

  technologyForm: FormGroup;

  categories: [string, string][] = [];

  formResult: any;
  error: HttpErrorResponse | null = null;

  constructor(private formService: FormService) {
    this.technologyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.formService.fetchCategoriesOptions().subscribe({
      next: (result) => this.categories = result,
      error: (error: HttpErrorResponse) => this.error = error
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['technologyData'] && this.technologyData) {
      this.technologyForm.setValue({
        name: this.technologyData.name,
        description: this.technologyData.description,
        category: this.technologyData.category.toUpperCase()
      }, { emitEvent: false });
      if(this.technologyData.name !== ""){
        this.title = `Edit Technology: ${this.technologyData.name}`
      }
    }
  }

  getErrorState(fieldName: string) {
    const descriptionControl = this.technologyForm.get(fieldName);
    return descriptionControl?.errors && descriptionControl?.touched;
  }

  sendForm() {
    this.technologyForm.markAllAsTouched();
    if (this.technologyForm.valid) {
      this.handleSubmit.emit(this.technologyForm.value)
    }
  }

  goBack() {
    this.handleGoBack.emit()
  }
}
