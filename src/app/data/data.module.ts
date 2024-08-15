import { InjectionToken, NgModule } from '@angular/core';
import { UserRepository } from '../core/repositories/user.repository';
import { GetUsersUsecase } from '../core/usecases/user/get-users.usecase';
import { GetUserUsecase } from '../core/usecases/user/get-user.usecase';
import { UpdateUserUsecase } from '../core/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from '../core/usecases/user/delete-user.usecase';
import { CreateUserUsecase } from '../core/usecases/user/create-user.usecase';
import { UserImplementationRepository } from './repositories/user/user-implementation.repository';
import { AuthRepository } from '../core/repositories/auth.repository';
import { LoginUsecase } from '../core/usecases/auth/login.usecase';
import { AuthImplementationRepository } from './repositories/auth/auth-implementation.repository';

const userRepositoryInjectionToken: InjectionToken<UserRepository> =
  new InjectionToken<UserRepository>('user repository');

const authRepositoryInjectionToken: InjectionToken<AuthRepository> =
  new InjectionToken<AuthRepository>('auth repository');

const getUsersUseCaseFactory = (
  userRepository: UserRepository
): GetUsersUsecase => new GetUsersUsecase(userRepository);
export const getUsersUseCaseProvider = {
  provide: GetUsersUsecase,
  useFactory: getUsersUseCaseFactory,
  deps: [userRepositoryInjectionToken],
};

const getUserUseCaseFactory = (
  userRepository: UserRepository
): GetUserUsecase => new GetUserUsecase(userRepository);
export const getUserUseCaseProvider = {
  provide: GetUserUsecase,
  useFactory: getUserUseCaseFactory,
  deps: [userRepositoryInjectionToken],
};

const createUserUseCaseFactory = (
  userRepository: UserRepository
): CreateUserUsecase => new CreateUserUsecase(userRepository);
export const createUserUseCaseProvider = {
  provide: CreateUserUsecase,
  useFactory: createUserUseCaseFactory,
  deps: [userRepositoryInjectionToken],
};

const updateUserUseCaseFactory = (
  userRepository: UserRepository
): UpdateUserUsecase => new UpdateUserUsecase(userRepository);
export const updateUserUseCaseProvider = {
  provide: UpdateUserUsecase,
  useFactory: updateUserUseCaseFactory,
  deps: [userRepositoryInjectionToken],
};

const deleteUserUseCaseFactory = (
  userRepository: UserRepository
): DeleteUserUsecase => new DeleteUserUsecase(userRepository);
export const deleteUserUseCaseProvider = {
  provide: DeleteUserUsecase,
  useFactory: deleteUserUseCaseFactory,
  deps: [userRepositoryInjectionToken],
};

const loginUseCaseFactory = (authRepository: AuthRepository): LoginUsecase =>
  new LoginUsecase(authRepository);
export const loginUseCaseProvider = {
  provide: LoginUsecase,
  useFactory: loginUseCaseFactory,
  deps: [authRepositoryInjectionToken],
};

@NgModule({
  providers: [
    getUsersUseCaseProvider,
    getUserUseCaseProvider,
    createUserUseCaseProvider,
    updateUserUseCaseProvider,
    deleteUserUseCaseProvider,
    {
      provide: userRepositoryInjectionToken,
      useClass: UserImplementationRepository,
    },
    loginUseCaseProvider,
    {
      provide: authRepositoryInjectionToken,
      useClass: AuthImplementationRepository,
    },
  ],
})
export class DataModule {}
