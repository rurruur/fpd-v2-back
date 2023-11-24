import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../auth/dto/user.dto';
import { DB } from '../database/database';
import { InjectDB } from '../database/kysely.module';

@Injectable()
export class PostService {
  constructor(@InjectDB() private readonly db: DB) {}

  async getPosts() {
    return this.db.selectFrom('post').selectAll().execute();
  }

  async createPost({ uid, name }: User, title: string, content: string) {
    const [result] = await this.db.insertInto('post').values({ uid, name, title, content }).execute();

    return this.db
      .selectFrom('post')
      .selectAll()
      .where('id', '=', result.insertId as any)
      .executeTakeFirst();
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

  async addComment({ uid, name }: User, id: number, content: string) {
    await this.db
      .selectFrom('post')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow(() => new NotFoundException('게시글을 찾을 수 없습니다.'));

    await this.db.insertInto('comment').values({ postId: id, content, uid, name }).execute();

    return this.getPostDetail(id);
  }
}
