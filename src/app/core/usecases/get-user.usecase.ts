import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { UserModel } from '../domain/user.model';
import { UserRepository } from '../repositories/user.repository';

export class GetUserUsecase implements UseCase<number, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(id: number): Observable<UserModel> {
    return this.userRepository.getUser(id);
  }
}
