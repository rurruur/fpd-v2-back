import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface AuthUserTable {
  uid: string;
  email: string;
  name: string;
  password: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type AuthUser = Selectable<AuthUserTable>;
export type NewAuthUser = Insertable<AuthUserTable>;
export type AuthUserUpdate = Updateable<AuthUserTable>;
