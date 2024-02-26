import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import FullForm from '../../interfaces/FullForm';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  sendForm(formData: FullForm) {
    return this.http.post(`${this.apiUrl}/admin/technology`, formData);
  }
 
  fetchRingOptions(): Observable<[string, string][]> {
    return this.http.get<[string, string][]>(`${this.apiUrl}/options/rings`);
  }

  fetchCategoriesOptions(): Observable<[string, string][]> {
    return this.http.get<[string, string][]>(`${this.apiUrl}/options/categories`);
  }
}