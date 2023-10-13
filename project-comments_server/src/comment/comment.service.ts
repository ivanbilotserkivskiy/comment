import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { OutputErrOrData } from 'src/types/OutputErrOrData';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findAll(filter, query?): Promise<CommentEntity[] | string> {
    let sortBy = 'created';
    let order = 'DESC';

    console.log(query);

    if (query && query.sortBy && query.order) {
      sortBy = query.sortBy;
      order = query.order;
    }
    try {
      const data = await this.commentRepository.find({
        order: {
          [sortBy]: order,
        },
        where: filter,
      });
      return data;
    } catch {
      return 'Can not get data';
    }
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

  async add(comment): Promise<OutputErrOrData<CommentEntity>> {
    try {
      const { parent_id, comment_text, file_path, username, email, tred_id } =
        comment;
      const data = await this.commentRepository.save({
        parent_id,
        tred_id,
        comment_text,
        file_path,
        username,
        email,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
