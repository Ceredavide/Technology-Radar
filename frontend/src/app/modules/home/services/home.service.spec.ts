import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import TechnologyViewer from '../../../shared/interfaces/TechnologyViewer';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/home/technology';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch published technologies', () => {
    const mockTechnologies: TechnologyViewer[] = [
      {
        category: "testCategory",
        rings: [
          {
            name: "testRing",
            technologies: [
              {
                name: "testTech",
                description: "this mock is too big",
                ring: "testRing",
                category: "testCategory",
                descriptionCategorization: "this mock is way to big",
                edits: []
              }]
          }
        ]
      }
    ]

  service.fetchPublishedTechnologies().subscribe(technologies => {
    expect(technologies.length).toBe(1);
    expect(technologies).toEqual(mockTechnologies);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockTechnologies);
});
});
