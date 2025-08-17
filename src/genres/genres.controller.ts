import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Public } from '../auth/public.decorator';
import type { CreateGenreDto, UpdateGenreDto } from './genres.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Public()
  @Get()
  list() {
    return this.genresService.findAll();
  }

  @Post()
  create(@Body() dto: CreateGenreDto, @Req() req: any) {
    return this.genresService.create(dto, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto, @Req() req: any) {
    return this.genresService.update(Number(id), dto, req.user);
  }
}


