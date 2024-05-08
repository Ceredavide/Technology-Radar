import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyViewerComponent } from './technology-viewer.component';
import { RingTechnologies } from './components/ring-technologies/ring-technologies.component';
import { CategoryTabs } from './components/category-tabs/category-tabs.component';
import TechnologyViewer from '../../interfaces/TechnologyViewer';
import { SimpleChange } from '@angular/core';

describe('TechnologyViewerComponent', () => {
    let component: TechnologyViewerComponent;
    let fixture: ComponentFixture<TechnologyViewerComponent>;
    let mockData: TechnologyViewer[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TechnologyViewerComponent, RingTechnologies, CategoryTabs],
        }).compileComponents();

        fixture = TestBed.createComponent(TechnologyViewerComponent);
        component = fixture.componentInstance;

        mockData = [{
            category: 'Development',
            rings: [
                {
                    name: 'Adopt',
                    technologies: [{
                        _id: "dfsfs", name: 'Angular',
                        description: 'A popular JavaScript framework for building web applications.',
                        ring: 'Adopt',
                        category: 'Development',
                        descriptionCategorization: 'Frontend Framework',
                        edits: []
                    }]
                }
            ]
        }];

        component.technologyRadar = mockData;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('initializes with default values on ngOnInit', () => {
        component.ngOnInit();
        expect(component.categories).toEqual(['Development']);
        expect(component.selectedRings).toEqual(mockData[0].rings);
        expect(component.selectedTechnologies).toEqual(mockData[0].rings[0].technologies);
    });

    it('updates categories and selections on ngOnChanges', () => {
        const changesObj = {
            technologyRadar: new SimpleChange(null, mockData, true)
        };
        component.ngOnChanges(changesObj);
        expect(component.categories).toEqual(['Development']);
        expect(component.selectedTechnologies).toEqual(mockData[0].rings[0].technologies);
    });

    it('emits selected technologies when category or ring changes', () => {
        const technologiesChangedSpy = jasmine.createSpyObj('technologiesChangedSpy', ['emit']);
        component.technologiesChanged = technologiesChangedSpy;

        component.categoryChange(0);
        expect(technologiesChangedSpy.emit).toHaveBeenCalledWith(mockData[0].rings[0].technologies);

        technologiesChangedSpy.emit.calls.reset();

        component.ringChange(0);
        expect(technologiesChangedSpy.emit).toHaveBeenCalledWith(mockData[0].rings[0].technologies);
    });
});

