import { map, Observable } from 'rxjs';
import {
  UserModel,
  PaginatedGetUsersResponseModel,
  NewUserModel,
} from '../../../core/domain/user.model';
import { UserRepository } from '../../../core/repositories/user.repository';
import { UserApisService } from './user-apis.service';
import { UserMapper } from './mappers/user.mapper';
import { Injectable } from '@angular/core';
import { NewUserMapper } from './mappers/new-user.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository implements UserRepository {
  private userMapper = new UserMapper();
  private newUserMapper = new NewUserMapper();

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
  createUser(user: NewUserModel): Observable<UserModel> {
    return this.userApisService
      .createUser(this.newUserMapper.mapTo(user))
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
