import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';

export class LogoutUsecase implements UseCase<void, void> {
  constructor(private authRepository: AuthRepository) {}

  execute(): Observable<void> {
    return this.authRepository.logout();
  }
}
