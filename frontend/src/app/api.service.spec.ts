import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service'

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendForm should post form data', () => {
    const formData = { name: 'Angular', ring: 'Stable', category: 'Frontend' };

    service.sendForm(formData).subscribe(response => {
      expect(response).toEqual(formData);
    });

    const req = httpMock.expectOne(`${apiUrl}/technology`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(formData);
  });

  it('fetchRingOptions should return an array of rings', () => {
    const mockRings = [
      { id: 1, name: 'Stable' },
      { id: 2, name: 'Experimental' }
    ];

    service.fetchRingOptions().subscribe(rings => {
      expect(rings.length).toBe(2);
      expect(rings).toEqual(mockRings);
    });

    const req = httpMock.expectOne(`${apiUrl}/options/rings`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRings);
  });

  it('fetchCategoriesOptions should return an array of categories', () => {
    const mockCategories = [
      { id: 1, name: 'Frontend' },
      { id: 2, name: 'Backend' }
    ];

    service.fetchCategoriesOptions().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${apiUrl}/options/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });
});
