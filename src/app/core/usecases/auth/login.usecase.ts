import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';

export class LoginUsecase
  implements UseCase<{ email: string; password: string }, string>
{
  constructor(private authRepository: AuthRepository) {}

  execute(params: { email: string; password: string }): Observable<string> {
    const { email, password } = params;
    return this.authRepository.login({ email, password });
  }
}
