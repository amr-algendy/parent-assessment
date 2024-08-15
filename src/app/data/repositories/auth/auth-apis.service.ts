import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../api/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthApisService {
  constructor(private http: HttpClient) {}

  login(params: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    const { email, password } = params;
    return this.http.post<any>(API_ENDPOINTS.LOGIN, { email, password });
  }
}
