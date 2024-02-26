import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import RingForm from '../../../interfaces/RingForm';
import { FormService } from '../../../services/form/form.service';

@Component({
  selector: 'app-ring-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ring-form.component.html'
})

export class RingFormComponent implements OnInit, OnChanges {

  @Input()
  required: boolean = false;

  @Input()
  ringData: RingForm | null = null;

  @Output()
  handleSubmit = new EventEmitter<RingForm>();

  @Output()
  handleGoBack = new EventEmitter<RingForm>();

  ringForm: FormGroup;

  rings: [string, string][] = [];

  constructor(private formService: FormService) {
    this.ringForm = new FormGroup({
      ring: new FormControl("", Validators.required),
      descriptionCategorization: new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
    this.formService.fetchRingOptions().subscribe({
      next: (result) => this.rings = result
    });
    if (this.ringData) {
      this.ringForm.setValue({
        ring: this.ringData.ring,
        descriptionCategorization: this.ringData.descriptionCategorization
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ringData'] && this.ringData) {
      this.ringForm.setValue({
        ring: this.ringData.ring.toUpperCase(),
        descriptionCategorization: this.ringData.descriptionCategorization
      }, { emitEvent: false });
    }
  }
  
  getErrorState(fieldName: string) {
    if(this.required){
      const descriptionControl = this.ringForm.get(fieldName);
      return descriptionControl?.errors && descriptionControl?.touched;
    }else {
      return false;
    }
  }

  onSubmit() {
    this.ringForm?.markAllAsTouched()
    if (this.required) {
      if (this.ringForm?.valid) {
        this.sendRingFormValues()
      }
    } else {
      this.sendRingFormValues()
    }
  }

  onStop(){
    this.handleGoBack.emit()
  }

  sendRingFormValues() {
    this.handleSubmit.emit(this.ringForm.value)
  }
}
