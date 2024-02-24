import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import TechnologyViewer from '../../../shared/interfaces/TechnologyViewer';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
 
  fetchPublishedTechnologies(): Observable<TechnologyViewer[]> {
    return this.http.get<TechnologyViewer[]>(`${this.apiUrl}/home/technology`);
  }
}