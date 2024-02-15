import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormService } from './form.service';
import TechnologyData from '../../interfaces/TechnologyData';

describe('FormService', () => {
    let service: FormService;
    let httpMock: HttpTestingController;
    const apiUrl = 'http://localhost:8080/api';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FormService]
        });
        service = TestBed.inject(FormService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Assicurati che non ci siano richieste pendenti
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#sendForm should post data correctly', () => {
        const dummyFormData: TechnologyData = {
            name: "test",
            category: {
                name: "test",
                description: "test"
            },
            ring: "test",
            description: "test"
        };

        service.sendForm(dummyFormData).subscribe(data => {
            expect(data).toEqual(dummyFormData); // o verifica l'effettiva risposta attesa
        });

        const req = httpMock.expectOne(`${apiUrl}/technology`);
        expect(req.request.method).toBe('POST');
        req.flush(dummyFormData);
    });

    it('#fetchRingOptions should return an Observable of ring options', () => {
        const dummyOptions: [string, string][] = [['1', 'Option 1'], ['2', 'Option 2']];

        service.fetchRingOptions().subscribe(options => {
            expect(options.length).toBe(2);
            expect(options).toEqual(dummyOptions);
        });

        const req = httpMock.expectOne(`${apiUrl}/options/rings`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyOptions);
    });

    it('#fetchCategoriesOptions should return an Observable of categories options', () => {
        const dummyOptions: [string, string][] = [['1', 'Category 1'], ['2', 'Category 2']];

        service.fetchCategoriesOptions().subscribe(options => {
            expect(options.length).toBe(2);
            expect(options).toEqual(dummyOptions);
        });

        const req = httpMock.expectOne(`${apiUrl}/options/categories`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyOptions);
    });

});
