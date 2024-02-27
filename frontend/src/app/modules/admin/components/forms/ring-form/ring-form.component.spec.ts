import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import RingForm from '../../../interfaces/RingForm';
import { RingFormComponent } from './ring-form.component';
import { FormService } from '../../../services/form/form.service';

const mockRingData: RingForm = { ring: 'Adopt', descriptionCategorization: 'Test Ring Form' };

describe('RingFormComponent', () => {
  let component: RingFormComponent;
  let fixture: ComponentFixture<RingFormComponent>;
  let formServiceMock: jasmine.SpyObj<FormService>;

  beforeEach(async () => {
    formServiceMock = jasmine.createSpyObj('FormService', ['fetchRingOptions']);
    formServiceMock.fetchRingOptions.and.returnValue(of([['Option1', 'Value1']]));

    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RingFormComponent ],
      providers: [
        { provide: FormService, useValue: formServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('form should be initialized', () => {
    expect(component.ringForm).toBeDefined();
    expect(component.ringForm.valid).toBeFalsy();
  });

  it('should update form values when @Input ringData changes', () => {
    component.ringData = mockRingData;
    component.ngOnChanges({
      ringData: new SimpleChange(null, mockRingData, true)
    });
    expect(component.ringForm.value).toEqual({
      ring: 'ADOPT',
      descriptionCategorization: 'Test Ring Form'
    });
  });

  it('should emit handleSubmit event with form value on valid submit', () => {
    spyOn(component.handleSubmit, 'emit');
    
    component.ringForm.setValue(mockRingData);
    component.onSubmit();
  
    expect(component.handleSubmit.emit).toHaveBeenCalledWith(mockRingData);
  });

  it('onStop should emit handleGoBack event', () => {
    spyOn(component.handleGoBack, 'emit');
  
    component.onStop();
  
    expect(component.handleGoBack.emit).toHaveBeenCalled();
  });  
});
