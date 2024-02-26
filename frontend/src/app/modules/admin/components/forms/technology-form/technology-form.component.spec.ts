import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnologyFormComponent } from './technology-form.component';
import { FormService } from '../../../services/form/form.service';
import { of, throwError } from 'rxjs';
import TechnologyForm from '../../../interfaces/TechnologyForm';

describe('TechnologyFormComponent', () => {
  let component: TechnologyFormComponent;
  let fixture: ComponentFixture<TechnologyFormComponent>;
  let formService: FormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, TechnologyFormComponent],
      providers: [FormService]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyFormComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories and rings on init', () => {
    const mockCategories: [string, string][] = [["Hello", 'Frontend']];
    const mockRings: [string, string][] = [["Hello", 'Frontend']];

    spyOn(formService, 'fetchCategoriesOptions').and.returnValue(of(mockCategories));
    spyOn(formService, 'fetchRingOptions').and.returnValue(of(mockRings));

    component.ngOnInit();

    expect(formService.fetchCategoriesOptions).toHaveBeenCalled();
    expect(formService.fetchRingOptions).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(component.rings).toEqual(mockRings);
  });

  it('should handle error when fetching categories fails', () => {
    const errorResponse = new Error('Failed to fetch categories');
    spyOn(formService, 'fetchCategoriesOptions').and.returnValue(throwError(() => errorResponse));
    spyOn(formService, 'fetchRingOptions').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(formService.fetchCategoriesOptions).toHaveBeenCalled();
    expect(component.error?.message).toBe(errorResponse.message);
  });

  it('should handle error when fetching rings fails', () => {
    const errorResponse = new Error('Failed to fetch rings');
    spyOn(formService, 'fetchRingOptions').and.returnValue(throwError(() => errorResponse));
    spyOn(formService, 'fetchCategoriesOptions').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(formService.fetchRingOptions).toHaveBeenCalled();
    expect(component.error?.message).toBe(errorResponse.message);
  });

  it('should populate errors when form is invalid', () => {
    expect(component.technologyForm.valid).toBeFalsy();

    component.sendForm();

    expect(component.technologyForm.touched).toBeTruthy();

    expect(component.technologyForm.get('name')?.errors?.['required']).toBeTruthy();
    expect(component.technologyForm.get('category')?.errors?.['required']).toBeTruthy();
    expect(component.technologyForm.get('description')?.errors?.['required']).toBeTruthy();
  });

  it('should submit form if valid', () => {
    const mockFormValue : TechnologyForm = { name: 'Angular', category: 'Frontend', descriptionCategorization: '' , ring: 'Stable', description: 'A framework' };
    const mockResponse = { message: 'Form submitted successfully' };

    component.technologyForm.setValue(mockFormValue);
    spyOn(formService, 'sendForm').and.returnValue(of(mockResponse));

    component.sendForm();

    expect(formService.sendForm).toHaveBeenCalledWith(mockFormValue);
    expect(component.formResult).toEqual(mockResponse);
  });
});
