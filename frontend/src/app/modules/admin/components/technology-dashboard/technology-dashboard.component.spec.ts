import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyDashboardComponent } from './technology-dashboard.component';
import { TechnologyService } from '../../services/technology/technology.service';
import { Observable, of } from 'rxjs';
import Technology from '../../../../shared/interfaces/Technology';
import TechnologyViewer from '../../../../shared/interfaces/TechnologyViewer';

class MockTechnologyService {
    fetchAllTechnologies(): Observable<TechnologyViewer[]> {
        return of([
            {
                category: 'Category 1',
                rings: [
                    {
                        name: 'Ring 1',
                        technologies: [
                            {
                                name: 'Technology 1',
                                description: 'Description for Technology 1',
                                ring: 'Ring 1',
                                category: 'Category 1',
                                descriptionCategorization: 'Description Categorization 1',
                                edits: [
                                    {
                                        user: {
                                            userName: 'John Doe',
                                            company: 'ABC Corp',
                                            email: 'john.doe@example.com',
                                            role: 'admin'
                                        },
                                        time: '2022-01-01T00:00:00Z'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
    }
}

describe('TechnologyDashboardComponent', () => {
    let component: TechnologyDashboardComponent;
    let fixture: ComponentFixture<TechnologyDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TechnologyDashboardComponent],
            providers: [
                { provide: TechnologyService, useClass: MockTechnologyService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TechnologyDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch technologies on init and assign them to technologyRadar', () => {
        fixture.detectChanges();
        expect(component.technologyRadar.length).toBe(1);
        expect(component.technologyRadar[0].category).toEqual('Category 1');
        expect(component.technologyRadar[0].rings[0].name).toEqual('Ring 1');
    });

    it('should set selected technologies', () => {
        const testTechnologies: Technology[] = [
            {
                name: 'Technology 3',
                description: 'Description 3',
                ring: 'Ring 3',
                category: 'Category 3',
                descriptionCategorization: 'Description Categorization 3',
                edits: []
            },
            {
                name: 'Technology 4',
                description: 'Description 4',
                ring: 'Ring 4',
                category: 'Category 4',
                descriptionCategorization: 'Description Categorization 4',
                edits: []
            }
        ];
        component.setTechnologies(testTechnologies);
        expect(component.selectedTechnologies.length).toBe(2);
        expect(component.selectedTechnologies[0].name).toEqual('Technology 3');
        expect(component.selectedTechnologies[1].name).toEqual('Technology 4');
    });
});
