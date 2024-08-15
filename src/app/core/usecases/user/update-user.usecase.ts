import { Observable } from 'rxjs';

import { UseCase } from '../../base/use-case';
import { UserRepository } from '../../repositories/user.repository';
import { UserModel } from '../../domain/user.model';

export class UpdateUserUsecase implements UseCase<UserModel, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(user: UserModel): Observable<UserModel> {
    return this.userRepository.updateUser(user);
  }
}
