import { Injectable, NotFoundException } from '@nestjs/common';
import { DB } from '../database/database';
import { InjectDB } from '../database/kysely.module';

@Injectable()
export class PostService {
  constructor(@InjectDB() private readonly db: DB) {}

  async getPosts() {
    return this.db.selectFrom('post').selectAll().execute();
  }

  async getPostDetail(id: number) {
    const post = await this.db
      .selectFrom('post')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow(() => new NotFoundException('게시글을 찾을 수 없습니다.'));

    const comments = await this.db.selectFrom('comment').selectAll().where('postId', '=', id).execute();

    return { ...post, comments };
  }
}
