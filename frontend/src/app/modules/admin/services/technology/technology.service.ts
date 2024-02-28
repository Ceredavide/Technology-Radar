import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import TechnologyViewer from '../../../../shared/interfaces/TechnologyViewer';
import Technology from '../../../../shared/interfaces/Technology';
import RingForm from '../../interfaces/RingForm';
import TechnologyForm from '../../interfaces/TechnologyForm';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiUrl = 'http://localhost:80/api/app/admin';

  constructor(private http: HttpClient) { }

  fetchAllTechnologies(): Observable<TechnologyViewer[]> {
    return this.http.get<TechnologyViewer[]>(`${this.apiUrl}/technology`);
  }

  getTechnologyById(technologyId: string): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiUrl}/technology/${technologyId}`);
  }

  publishTechnology(technologyId: string, ringFormData: RingForm): Observable<HttpResponse<200>> {
    return this.http.put<HttpResponse<200>>(`${this.apiUrl}/technology/publish/${technologyId}`, ringFormData);
  }

  editTechnology(technologyId: string, technologyFormData: TechnologyForm): Observable<HttpResponse<200>>{
    return this.http.put<HttpResponse<200>>(`${this.apiUrl}/technology/${technologyId}`, technologyFormData);
  }

  editTecgnologyRing(technologyId: string, ringFormData: RingForm): Observable<HttpResponse<200>> {
    return this.http.put<HttpResponse<200>>(`${this.apiUrl}/technology/ring/${technologyId}`, ringFormData);
  }
}