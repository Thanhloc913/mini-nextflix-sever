import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { CommentsService } from './comments.service';
import type { CreateCommentDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Get('movie/:movieId')
  byMovie(@Param('movieId') movieId: string) {
    return this.commentsService.listByMovie(Number(movieId));
  }

  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: any) {
    return this.commentsService.create(dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.commentsService.remove(id, req.user);
  }
}


