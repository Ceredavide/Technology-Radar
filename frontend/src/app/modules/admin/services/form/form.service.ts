import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import TechnologyData from '../../interfaces/TechnologyData';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  sendForm(formData: TechnologyData) {
    return this.http.post(`${this.apiUrl}/technology`, formData);
  }
 
  fetchRingOptions(): Observable<[string, string][]> {
    return this.http.get<[string, string][]>(`${this.apiUrl}/options/rings`);
  }

  fetchCategoriesOptions(): Observable<[string, string][]> {
    return this.http.get<[string, string][]>(`${this.apiUrl}/options/categories`);
  }
}