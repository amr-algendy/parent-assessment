import { Observable } from 'rxjs';
import {
  UserModel,
  PaginatedGetUsersResponseModel,
} from '../domain/user.model';

export interface UserRepository {
  getUsers(pageNumber: number): Observable<PaginatedGetUsersResponseModel>;
  getUser(id: number): Observable<UserModel>;
  createUser(user: UserModel): Observable<UserModel>;
  deleteUser(id: number): Observable<boolean>;
  updateUser(user: UserModel): Observable<UserModel>;
}
