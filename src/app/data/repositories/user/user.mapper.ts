import { Mapper } from '../../../core/base/mapper';
import { UserModel } from '../../../core/domain/user.model';
import { UserEntity } from './user.entity';

export class UserMapper implements Mapper<UserEntity, UserModel> {
  mapFrom(userEntity: UserEntity): UserModel {
    return {
      id: userEntity.id,
      email: userEntity.email,
      firstName: userEntity.first_name,
      lastName: userEntity.last_name,
      avatar: userEntity.avatar,
    };
  }

  mapTo(userModel: UserModel): UserEntity {
    return {
      id: userModel.id,
      email: userModel.email,
      first_name: userModel.firstName,
      last_name: userModel.lastName,
      avatar: userModel.avatar,
    };
  }
}
