import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { TechnologyCreateComponent } from './technology-create.component';
import { FormService } from '../../services/form/form.service';

class MockRouter {
  navigateByUrl(url: string) {
    return Promise.resolve(true);
  }
}

class MockFormService {
  sendForm() {
    return of({});
  }
  fetchCategoriesOptions() {
    return of([]);
  }
}

describe('TechnologyCreateComponent', () => {
    let component: TechnologyCreateComponent;
    let fixture: ComponentFixture<TechnologyCreateComponent>;
    let router: Router;
    let formService: FormService;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ TechnologyCreateComponent ],
        providers: [
          { provide: Router, useClass: MockRouter },
          { provide: FormService, useClass: MockFormService }
        ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(TechnologyCreateComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      formService = TestBed.inject(FormService);
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should start at step 0', () => {
      expect(component.stepCount).toEqual(0);
    });
  
    it('should handle technology form submission', () => {
      const techData = { name: "New Tech", description: "A new technology", category: "Innovation" };
      component.handleTechnologySubmit(techData);
      expect(component.technologyData).toEqual(techData);
      expect(component.stepCount).toEqual(1);
    });
  
    it('should handle ring form submission and navigate to dashboard', () => {
      const ringData = { ring: "Adopt", descriptionCategorization: "Widely Used" };
      spyOn(formService, 'sendForm').and.returnValue(of({}));
      spyOn(router, 'navigateByUrl');
  
      component.handleRingSubmit(ringData);
  
      expect(formService.sendForm).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('admin/dashboard');
    });
  
    it('should navigate to admin dashboard on go back from step 0', () => {
      component.stepCount = 0;
      spyOn(router, 'navigateByUrl');
  
      component.handleGoBack();
  
      expect(router.navigateByUrl).toHaveBeenCalledWith('admin/dashboard');
    });
  
    it('should reset to step 0 on go back from step 1', () => {
      component.stepCount = 1;
  
      component.handleGoBack();
  
      expect(component.stepCount).toEqual(0);
    });
  });
  
