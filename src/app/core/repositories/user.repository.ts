import { Observable } from 'rxjs';
import {
  UserModel,
  PaginatedGetUsersResponseModel,
  NewUserModel,
} from '../domain/user.model';

export interface UserRepository {
  getUsers(pageNumber: number): Observable<PaginatedGetUsersResponseModel>;
  getUser(id: number): Observable<UserModel>;
  createUser(user: NewUserModel): Observable<UserModel>;
  deleteUser(id: number): Observable<boolean>;
  updateUser(user: UserModel): Observable<UserModel>;
}
