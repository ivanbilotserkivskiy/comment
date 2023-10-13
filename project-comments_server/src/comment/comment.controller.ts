import { In, IsNull } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { customFileValidator } from 'src/utils/customFileValidator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Query() query): Promise<CommentEntity[] | string> {
    const mainComments = await this.commentService.findAll(
      {
        parent_id: IsNull(),
      },
      query,
    );

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const unixid = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${unixid}${ext}`;

          callback(null, filename);
        },
      }),
      fileFilter: customFileValidator,
    }),
  )
  async add(
    @Body() comment: CommentEntity,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false }))
    file?: Express.Multer.File,
  ): Promise<CommentEntity | string> {
    const { parent_id, comment_text, username, email, tred_id } = comment;

    console.log(comment);

    let dbfilename = null;

    if (file) {
      dbfilename = `/files/${file.filename}`;
    }

    const newComment = await this.commentService.add({
      parent_id: +parent_id,
      tred_id: +tred_id,
      comment_text,
      file_path: dbfilename,
      username,
      email,
    });

    return newComment;
  }
}
