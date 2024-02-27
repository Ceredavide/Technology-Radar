import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

import TechnologyForm from '../../../interfaces/TechnologyForm';
import { FormService } from '../../../services/form/form.service';
import { TechnologyFormComponent } from './technology-form.component';

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

  it('should initialize the technologyForm with empty fields', () => {
    const form = component.technologyForm;
    expect(form.get('name')?.value).toEqual('');
    expect(form.get('description')?.value).toEqual('');
    expect(form.get('category')?.value).toEqual('');
  });

  it('should populate the form when @Input technologyData changes', () => {
    const mockTechnologyData : TechnologyForm = { name: 'Angular', description: 'Framework', category: 'Frontend' };
    component.technologyData = mockTechnologyData;
  
    component.ngOnChanges({
      technologyData: {
        currentValue: mockTechnologyData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
  
    fixture.detectChanges();
  
    expect(component.technologyForm.value).toEqual({
      name: 'Angular',
      description: 'Framework',
      category: 'FRONTEND'
    });
  });

  it('should emit handleSubmit event with form value on valid form submission', () => {
    spyOn(component.handleSubmit, 'emit');

    component.technologyForm.setValue({ name: 'React', description: 'Library', category: 'Frontend' });
    component.sendForm();

    expect(component.handleSubmit.emit).toHaveBeenCalledWith({
      name: 'React',
      description: 'Library',
      category: 'Frontend'
    });
  });

  it('should not emit handleSubmit event if form is invalid', () => {
    spyOn(component.handleSubmit, 'emit');
    component.technologyForm.setValue({ name: '', description: '', category: '' });
    component.sendForm();

    expect(component.handleSubmit.emit).not.toHaveBeenCalled();
  });

  it('should set error when fetchCategoriesOptions fails', () => {
    spyOn(formService, 'fetchCategoriesOptions').and.returnValue(throwError(() => new Error('Service Error')));
  
    component.ngOnInit();
  
    expect(component.error).toBeTruthy();
  });
  
  it('should emit handleGoBack event on goBack call', () => {
    spyOn(component.handleGoBack, 'emit');
    component.goBack();
    expect(component.handleGoBack.emit).toHaveBeenCalled();
  });

});
