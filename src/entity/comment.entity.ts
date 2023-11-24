import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface CommentTable {
  id: Generated<number>;
  postId: number;
  uid: string;
  name: string;
  content: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;
