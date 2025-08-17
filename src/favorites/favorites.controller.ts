import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.favoritesService.listMine(req.user);
  }

  @Post(':movieId')
  add(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.add(Number(movieId), req.user);
  }

  @Delete(':movieId')
  remove(@Param('movieId') movieId: string, @Req() req: any) {
    return this.favoritesService.remove(Number(movieId), req.user);
  }
}


