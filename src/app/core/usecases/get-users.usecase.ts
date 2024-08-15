import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PaginatedGetUsersResponseModel } from '../domain/user.model';
import { UserRepository } from '../repositories/user.repository';

export class GetUsersUsecase
  implements UseCase<number, PaginatedGetUsersResponseModel>
{
  constructor(private userRepository: UserRepository) {}

  execute(pageNumber: number): Observable<PaginatedGetUsersResponseModel> {
    return this.userRepository.getUsers(pageNumber);
  }
}
