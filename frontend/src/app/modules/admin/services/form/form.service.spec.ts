import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormService } from './form.service';
import FullForm from '../../interfaces/FullForm';

describe('FormService', () => {
  let service: FormService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormService]
    });
    service = TestBed.inject(FormService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send form data correctly', () => {
    const testData: FullForm = {
        name: "Artificial Intelligence",
        description: "Techniques used to create applications that can engage in behaviors that humans consider intelligent.",
        category: "Machine Learning",
        ring: "Adopt",
        descriptionCategorization: "High strategic importance and recommended for widespread adoption."
    };
    

    service.sendForm(testData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/admin/technology`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);
    req.flush({status: 'success'});
  });

  it('should fetch ring options correctly', () => {
    const mockRingOptions: [string, string][] = [['1', 'Option1'], ['2', 'Option2']];

    service.fetchRingOptions().subscribe(options => {
      expect(options.length).toBe(2);
      expect(options).toEqual(mockRingOptions);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/options/rings`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRingOptions);
  });

  it('should fetch categories options correctly', () => {
    const mockCategoriesOptions: [string, string][] = [['1', 'Category1'], ['2', 'Category2']];

    service.fetchCategoriesOptions().subscribe(options => {
      expect(options.length).toBe(2);
      expect(options).toEqual(mockCategoriesOptions);
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/options/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoriesOptions);
  });

  it('should handle errors when fetching ring options', () => {
    const mockErrorMsg = '404 error occurred';

    service.fetchRingOptions().subscribe({
      next: options => fail('should have failed with 404 error'),
      error: error => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}/options/rings`);
    req.flush(mockErrorMsg, { status: 404, statusText: 'Not Found' });
  });
});

