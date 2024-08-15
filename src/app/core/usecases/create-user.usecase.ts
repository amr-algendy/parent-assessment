import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { NewUserModel, UserModel } from '../domain/user.model';
import { UserRepository } from '../repositories/user.repository';

export class CreateUserUsecase implements UseCase<NewUserModel, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(user: NewUserModel): Observable<UserModel> {
    return this.userRepository.createUser(user);
  }
}
