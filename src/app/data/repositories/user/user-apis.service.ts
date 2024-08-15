import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PaginatedGetUsersResponseEntity, UserEntity } from './user.entity';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_ENDPOINTS } from '../../api/endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserApisService {
  constructor(private http: HttpClient) {}

  getUsers(pageNumber: number): Observable<PaginatedGetUsersResponseEntity> {
    return this.http.get<PaginatedGetUsersResponseEntity>(
      API_ENDPOINTS.GET_USERS,
      {
        params: { pageNumber },
      }
    );
  }
  getUser(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(API_ENDPOINTS.GET_USER(id));
  }
  createUser(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(API_ENDPOINTS.CREATE_USER, user);
  }
  deleteUser(id: number): Observable<HttpResponse<boolean>> {
    return this.http.delete<boolean>(API_ENDPOINTS.DELETE_USER(id), {
      observe: 'response',
    });
  }
  updateUser(user: UserEntity): Observable<UserEntity> {
    return this.http.patch<UserEntity>(
      API_ENDPOINTS.UPDATE_USER(user.id),
      user
    );
  }
}
