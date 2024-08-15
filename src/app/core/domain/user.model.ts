export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface PaginatedGetUsersResponseModel {
  page: number;
  total: number;
  totalPages: number;
  users: UserModel[];
}
