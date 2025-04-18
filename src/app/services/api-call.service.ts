import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private baseUrl = 'http://localhost:8080/api/v1';
  constructor(private httpClient: HttpClient) {}

  private getHeaders(
    requiresAuth: boolean = true,
    includeContentType: boolean = true
  ): HttpHeaders {
    let headers = new HttpHeaders();

    if (includeContentType) {
      headers = headers.set('Content-Type', 'application/json');
    }

    if (requiresAuth) {
      const token = sessionStorage.getItem('token') as string;
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getdownloadFile(endpoint: string): Observable<Blob> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.get(url, {
      responseType: 'blob',
      headers: this.getHeaders(true, true),
    });
  }

  get<T>(endpoint: string, requiresAuth: boolean = true): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.get<T>(url, {
      headers: this.getHeaders(requiresAuth),
    });
  }

  post<T>(
    endpoint: string,
    data: any,
    requiresAuth: boolean = true
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.post<T>(url, data, {
      headers: this.getHeaders(requiresAuth),
    });
  }

  postFormData<T>(
    endpoint: string,
    data: FormData,
    requiresAuth: boolean = true
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.getHeaders(requiresAuth);

    return this.httpClient.post<T>(url, data, {
      headers: headers,
    });
  }

  put<T>(
    endpoint: string,
    data: any,
    requiresAuth: boolean = true
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.put<T>(url, data, { headers: this.getHeaders() });
  }

  delete<T>(
    endpoint: string,
    data: any,
    requiresAuth: boolean = true
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.httpClient.delete<T>(url, { headers: this.getHeaders() });
  }
}
