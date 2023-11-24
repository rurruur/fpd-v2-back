import { Injectable } from '@nestjs/common';
import { DB } from '../database/database';
import { InjectDB } from '../database/kysely.module';

@Injectable()
export class PostService {
  constructor(@InjectDB() private readonly db: DB) {}

  async getPosts() {
    return this.db.selectFrom('post').selectAll().execute();
  }
}
