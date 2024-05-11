import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RingHandlerComponent } from './ring-handler.component';
import { TechnologyService } from '../../services/technology/technology.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import Technology from '../../../../shared/interfaces/Technology';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

describe('RingHandlerComponent', () => {
  let component: RingHandlerComponent;
  let fixture: ComponentFixture<RingHandlerComponent>;
  let mockTechnologyService: jasmine.SpyObj<TechnologyService>;
  let mockRouter: Router;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTechnologyService = jasmine.createSpyObj('TechnologyService', ['getTechnologyById', 'publishTechnology', 'editTechnologyRing']);

    mockActivatedRoute = {
      snapshot: {
        url: [{}, {}, { path: 'edit' }]
      },
      paramMap: of(convertToParamMap({ id: '123' }))
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, RingHandlerComponent,HttpClientModule],
      providers: [
        { provide: TechnologyService, useValue: mockTechnologyService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RingHandlerComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigateByUrl');
    spyOn(mockRouter, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set action and technologyId based on the route parameters', () => {
    expect(component.action).toEqual('edit');
    expect(component.technologyId).toEqual('123');
    expect(mockTechnologyService.getTechnologyById).toHaveBeenCalledWith('123');
  });

it('should fetch and set ring values', () => {
    const mockTechnology: Technology = {
        ring: 'Alpha', descriptionCategorization: 'TypeA', name: 'Tech1',
        description: '',
        category: '',
        edits: []
    };
    mockTechnologyService.getTechnologyById.and.returnValue(of<Technology>(mockTechnology));
    
    component.getRingValues('123');
    fixture.detectChanges();

    expect(component.ringData).toEqual({ ring: 'Alpha', descriptionCategorization: 'TypeA' });
    expect(component.title).toEqual('Edit Ring: Tech1');
});

it('should call publishTechnology when action is publish and navigate', () => {
    component.action = 'publish';
    const formData = { ring: 'Beta', descriptionCategorization: 'TypeB' };
    mockTechnologyService.publishTechnology.and.returnValue(of(<HttpResponse<200>>{}));

    component.handleSubmit(formData);
    fixture.detectChanges();

    expect(mockTechnologyService.publishTechnology).toHaveBeenCalledWith('123', formData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
});

it('should call editTechnologyRing when action is edit and navigate', () => {
    const formData = { ring: 'Gamma', descriptionCategorization: 'TypeC' };
    mockTechnologyService.editTechnologyRing.and.returnValue(of(<HttpResponse<200>>{}));

    component.handleSubmit(formData);
    fixture.detectChanges();

    expect(mockTechnologyService.editTechnologyRing).toHaveBeenCalledWith('123', formData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
});

it('should navigate back to admin dashboard on handleGoBack', () => {
    component.handleGoBack();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('admin/dashboard');
});

});
