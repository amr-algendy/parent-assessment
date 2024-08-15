import { Observable } from 'rxjs';

import { UseCase } from '../../base/use-case';
import { UserRepository } from '../../repositories/user.repository';

export class DeleteUserUsecase implements UseCase<number, boolean> {
  constructor(private userRepository: UserRepository) {}

  execute(id: number): Observable<boolean> {
    return this.userRepository.deleteUser(id);
  }
}
