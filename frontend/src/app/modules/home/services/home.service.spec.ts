import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import TechnologyRadar from '../interfaces/TechnologyRadar';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/technology';

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
    const mockTechnologies: TechnologyRadar[] = [
        {
            categoryName: "testCategory",
            values: [
                {
                    ringName: "testRing",
                    technologies: [
                        {
                            name: "testTech",
                            description : "this mock is too big",
                            ring: "testRing",
                            category: {
                                name: "testCategory",
                                description: "this mock is way to big"
                            }
                        }
                    ]
                }
            ]
        }
    ];

    service.fetchPublishedTechnologies().subscribe(technologies => {
      expect(technologies.length).toBe(1);
      expect(technologies).toEqual(mockTechnologies);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTechnologies);
  });
});
