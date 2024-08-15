import { map, Observable } from 'rxjs';
import {
  UserModel,
  PaginatedGetUsersResponseModel,
} from '../../../core/domain/user.model';
import { UserRepository } from '../../../core/repositories/user.repository';
import { UserApisService } from './user-apis.service';
import { UserMapper } from './user.mapper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository implements UserRepository {
  private userMapper = new UserMapper();

  constructor(private userApisService: UserApisService) {}

  getUsers(pageNumber: number): Observable<PaginatedGetUsersResponseModel> {
    return this.userApisService.getUsers(pageNumber).pipe(
      map((response) => ({
        page: response.page,
        total: response.total,
        totalPages: response.total_pages,
        users: response.data.map(this.userMapper.mapFrom),
      }))
    );
  }
  getUser(id: number): Observable<UserModel> {
    return this.userApisService.getUser(id).pipe(map(this.userMapper.mapFrom));
  }
  createUser(user: UserModel): Observable<UserModel> {
    return this.userApisService
      .createUser(this.userMapper.mapTo(user))
      .pipe(map(this.userMapper.mapFrom));
  }
  deleteUser(id: number): Observable<boolean> {
    return this.userApisService
      .deleteUser(id)
      .pipe(map((response) => response.status === 204));
  }
  updateUser(user: UserModel): Observable<UserModel> {
    return this.userApisService
      .updateUser(this.userMapper.mapTo(user))
      .pipe(map(this.userMapper.mapFrom));
  }
}
