import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { UserModel } from '../domain/user.model';
import { UserRepository } from '../repositories/user.repository';

export class GetUsersUsecase implements UseCase<number, UserModel[]> {
  constructor(private userRepository: UserRepository) {}

  execute(pageNumber: number): Observable<UserModel[]> {
    return this.userRepository.getUsers(pageNumber);
  }
}
