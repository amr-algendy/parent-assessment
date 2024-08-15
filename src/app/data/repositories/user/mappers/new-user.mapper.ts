import { Mapper } from '../../../../core/base/mapper';
import { NewUserModel } from '../../../../core/domain/user.model';
import { NewUserEntity } from '../user.entity';

export class NewUserMapper implements Mapper<NewUserEntity, NewUserModel> {
  mapFrom(userEntity: NewUserEntity): NewUserModel {
    return {
      email: userEntity.email,
      firstName: userEntity.first_name,
      lastName: userEntity.last_name,
      avatar: userEntity.avatar,
    };
  }

  mapTo(userModel: NewUserModel): NewUserEntity {
    return {
      email: userModel.email,
      first_name: userModel.firstName,
      last_name: userModel.lastName,
      avatar: userModel.avatar,
    };
  }
}
