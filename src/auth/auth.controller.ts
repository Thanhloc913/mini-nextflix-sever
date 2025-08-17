import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import type {
  LoginDto,
  RefreshDto,
  AdminLoginDto,
  AdminRefreshDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Public()
  @Post('admin/login')
  adminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto.username, dto.password);
  }

  @Public()
  @Post('admin/refresh')
  adminRefresh(@Body() dto: AdminRefreshDto) {
    return this.authService.refreshAdmin(dto.refreshToken);
  }

  @Post('logout')
  logout() {
    // Optional: clients can just drop token; server-side blacklist handled by TTL in Redis
    return { success: true };
  }
}
