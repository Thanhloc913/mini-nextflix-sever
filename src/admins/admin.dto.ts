export interface CreateAdminDto {
  username: string;
  password: string;
  role?: 'admin' | 'superadmin';
}

export interface UpdateAdminDto {
  password?: string;
  role?: 'admin' | 'superadmin';
}
