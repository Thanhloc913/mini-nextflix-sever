import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from '../auth/public.decorator';
import type { CreateMovieDto, MovieQueryDto, UpdateMovieDto } from './movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get()
  list(@Query() query: MovieQueryDto) {
    return this.moviesService.findAll(query);
  }

  @Public()
  @Get(':id')
  detail(@Param('id') id: string) {
    return this.moviesService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateMovieDto, @Req() req: any) {
    return this.moviesService.create(dto, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto, @Req() req: any) {
    return this.moviesService.update(Number(id), dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.moviesService.remove(Number(id), req.user);
  }
}


