export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  avatarURL: string;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  avatarURL?: string;
}
