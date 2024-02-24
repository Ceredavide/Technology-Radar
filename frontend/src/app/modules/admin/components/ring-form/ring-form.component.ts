import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import RingForm from '../../interfaces/RingForm';
import { FormService } from '../../services/form/form.service';

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
  ringFormData: RingForm | null = null;

  @Output()
  getRingFormValues = new EventEmitter<RingForm>();

  @Output()
  stop = new EventEmitter<RingForm>();

  ringForm: FormGroup;

  rings: [string, string][] = [];

  constructor(private formService: FormService) {
    this.ringForm = new FormGroup({
      ring: new FormControl(""),
      descriptionCategorization: new FormControl("")
    })
  }

  ngOnInit() {
    this.formService.fetchRingOptions().subscribe({
      next: (result) => this.rings = result
    });
    if (this.ringFormData) {
      this.ringForm.setValue({
        ring: this.ringFormData.ring,
        descriptionCategorization: this.ringFormData.descriptionCategorization
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ringFormData'] && this.ringFormData) {
      this.ringForm.setValue({
        ring: this.ringFormData.ring.toUpperCase(),
        descriptionCategorization: this.ringFormData.descriptionCategorization
      }, { emitEvent: false });
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
    this.stop.emit()
  }

  sendRingFormValues() {
    this.getRingFormValues.emit({
      ring: this.ringForm.controls['ring'].value,
      descriptionCategorization: this.ringForm.controls['descriptionCategorization'].value,
    })
  }
}
