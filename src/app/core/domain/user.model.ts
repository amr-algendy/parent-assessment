export interface NewUserModel {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  job?: string;
}

export interface UserModel extends NewUserModel {
  id: number;
}

export interface PaginatedGetUsersResponseModel {
  page: number;
  total: number;
  totalPages: number;
  users: UserModel[];
}
