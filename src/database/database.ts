import { Kysely } from 'kysely';
import { AuthSaltTable } from '../entity/auth-salt.entity';
import { AuthUserTable } from '../entity/auth-user.entity';
import { CommentTable } from '../entity/comment.entity';
import { PostTable } from '../entity/post.entity';

export interface Database {
  authUser: AuthUserTable;
  authSalt: AuthSaltTable;
  post: PostTable;
  comment: CommentTable;
}

export type DB = Kysely<Database>;
