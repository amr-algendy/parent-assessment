export interface NewUserEntity {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserEntity extends NewUserEntity {
  id: number;
}

export interface PaginatedGetUsersResponseEntity {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserEntity[];
}
