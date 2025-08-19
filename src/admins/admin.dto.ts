export interface CreateAdminDto {
  username: string;
  password: string;
  avatarURL: string;
  role?: 'admin' | 'superadmin';
}

export interface UpdateAdminDto {
  password?: string;
  avatarURL?: string;
  role?: 'admin' | 'superadmin';
}
