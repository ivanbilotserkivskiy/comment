import { In, IsNull } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OutputErrOrData } from 'src/types/OutputErrOrData';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<CommentEntity[] | string> {
    const mainComments = await this.commentService.findAll({
      parent_id: IsNull(),
    });

    if (typeof mainComments === 'string') {
      return mainComments;
    }

    const tredIds = mainComments.map((comment) => comment.tred_id);

    const comentsByTred = await this.commentService.findAll({
      tred_id: In(tredIds),
    });

    if (typeof comentsByTred === 'string') {
      return comentsByTred;
    }

    const getChildren = (children: CommentEntity[]) => {
      const nextChildren = children.map((child) => {
        const data = comentsByTred.filter(
          (comment) => comment.parent_id === child.id,
        );
        const nextData = getChildren(data);

        return {
          ...child,
          children: nextData,
        };
      });

      return nextChildren;
    };

    const commentsData = getChildren(mainComments);

    return commentsData;
  }

  @Post()
  async add(
    @Body() comment: CommentEntity,
  ): Promise<OutputErrOrData<CommentEntity>> {
    const { parent_id, comment_text, file_path, username, email, tred_id } =
      comment;
    const errOrData = this.commentService.add({
      parent_id,
      tred_id,
      comment_text,
      file_path,
      username,
      email,
    });

    return errOrData;
  }
}
