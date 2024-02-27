import { TestBed } from '@angular/core/testing';
import { TechnologyService } from './technology.service';
import { HttpResponse } from '@angular/common/http';

import Technology from '../../../../shared/interfaces/Technology';
import TechnologyViewer from '../../../../shared/interfaces/TechnologyViewer';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const mockTechnology: Technology = { name: "t", description: "e", category: "s", ring: "t", descriptionCategorization: "tt", edits: [] }
const mockTechnologies: TechnologyViewer[] = [{ category: "test", rings: [{ name: "test_test", technologies: [mockTechnology] }] }];

const API_URL = "http://localhost:8080/api/admin"

describe('TechnologyService', () => {
    let service: TechnologyService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TechnologyService]
        });
        service = TestBed.inject(TechnologyService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch all technologies', () => {
        service.fetchAllTechnologies().subscribe(technologies => {
            expect(technologies).toEqual(mockTechnologies);
        });

        const req = httpMock.expectOne(`${API_URL}/technology`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTechnologies);
    });

    it('should retrieve a technology by ID', () => {
        service.getTechnologyById('1').subscribe(technology => {
            expect(technology).toEqual(mockTechnology);
        });

        const req = httpMock.expectOne(`${API_URL}/technology/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockTechnology);
    });

    it('should publish a technology', () => {
        const ringFormData = { ring: 'Adopt', descriptionCategorization: 'Some description' };

        service.publishTechnology('1', ringFormData).subscribe();

        const req = httpMock.expectOne(`${API_URL}/technology/publish/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(ringFormData);
    });

});
