import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnologyComponent } from './technology.component';
import { ApiService } from '../../api.service';
import { of, throwError } from 'rxjs';

describe('TechnologyFormComponent', () => {
  let component: TechnologyComponent;
  let fixture: ComponentFixture<TechnologyComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, TechnologyComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories and rings on init', () => {
    const mockCategories = [{ id: 1, name: 'Frontend' }];
    const mockRings = [{ id: 1, name: 'Stable' }];

    spyOn(apiService, 'fetchCategoriesOptions').and.returnValue(of(mockCategories));
    spyOn(apiService, 'fetchRingOptions').and.returnValue(of(mockRings));

    component.ngOnInit();

    expect(apiService.fetchCategoriesOptions).toHaveBeenCalled();
    expect(apiService.fetchRingOptions).toHaveBeenCalled();
    expect(component.categories).toEqual(Object.entries(mockCategories));
    expect(component.rings).toEqual(Object.entries(mockRings));
  });

  it('should handle error when fetching categories fails', () => {
    const errorResponse = new Error('Failed to fetch categories');
    spyOn(apiService, 'fetchCategoriesOptions').and.returnValue(throwError(() => errorResponse));
    spyOn(apiService, 'fetchRingOptions').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.fetchCategoriesOptions).toHaveBeenCalled();
    expect(component.error).toBe(errorResponse);
  });

  it('should handle error when fetching rings fails', () => {
    const errorResponse = new Error('Failed to fetch rings');
    spyOn(apiService, 'fetchRingOptions').and.returnValue(throwError(() => errorResponse));
    spyOn(apiService, 'fetchCategoriesOptions').and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.fetchRingOptions).toHaveBeenCalled();
    expect(component.error).toBe(errorResponse);
  });

  it('should populate errors when form is invalid', () => {
    expect(component.technologyForm.valid).toBeFalsy();
    
    component.sendForm();

    expect(component.technologyForm.touched).toBeTruthy();

    expect(component.technologyForm.get('name')?.errors?.['required']).toBeTruthy();
    expect(component.technologyForm.get('category.name')?.errors?.['required']).toBeTruthy();
    expect(component.technologyForm.get('description')?.errors?.['required']).toBeTruthy();
  });

  it('should submit form if valid', () => {
    const mockFormValue = { name: 'Angular', category: { name: 'Frontend', description: '' }, ring: 'Stable', description: 'A framework' };
    const mockResponse = { message: 'Form submitted successfully' };

    component.technologyForm.setValue(mockFormValue);
    spyOn(apiService, 'sendForm').and.returnValue(of(mockResponse));

    component.sendForm();

    expect(apiService.sendForm).toHaveBeenCalledWith(mockFormValue);
    expect(component.result).toEqual(mockResponse);
  });
});
