import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<CommentEntity[]> {
    const comments = await this.commentService.findAll();

    return comments;
  }

  @Get(':tred_id')
  async findByTredId(
    @Param('tred_id') tred_id: string,
  ): Promise<CommentEntity[]> {
    const comments = await this.commentService.findByTredId(tred_id);

    return comments;
  }

  @Post()
  async add(@Body() comment: CommentEntity): Promise<CommentEntity> {
    const { tred_id, parent_id, comment_text, file_path, username, email } =
      comment;
    return this.commentService.add({
      tred_id,
      parent_id,
      comment_text,
      file_path,
      username,
      email,
    });
  }
}
