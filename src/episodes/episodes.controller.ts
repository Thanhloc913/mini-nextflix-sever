import { Body, Controller, Delete, Param, Patch, Post, Req } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import type { CreateEpisodeDto, UpdateEpisodeDto } from './episodes.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() dto: CreateEpisodeDto, @Req() req: any) {
    return this.episodesService.create(dto, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEpisodeDto, @Req() req: any) {
    return this.episodesService.update(Number(id), dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.episodesService.remove(Number(id), req.user);
  }
}


