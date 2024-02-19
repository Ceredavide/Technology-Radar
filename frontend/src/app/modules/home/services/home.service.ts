import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TechnologyRadar from '../interfaces/TechnologyRadar';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
 
  fetchPublishedTechnologies(): Observable<TechnologyRadar[]> {
    return this.http.get<TechnologyRadar[]>(`${this.apiUrl}/technology`);
  }
}