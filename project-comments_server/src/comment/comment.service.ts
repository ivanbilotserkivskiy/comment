import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      order: {
        created: 'DESC',
      },
    });
  }

  async findByTredId(tred_id: string): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      where: {
        tred_id: +tred_id,
      },
      order: {
        created: 'DESC',
      },
    });
  }

  async add(comment): Promise<CommentEntity> {
    const { tred_id, parent_id, comment_text, file_path, username, email } =
      comment;
    return this.commentRepository.save({
      tred_id,
      parent_id,
      comment_text,
      file_path,
      username,
      email,
    });
  }
}
