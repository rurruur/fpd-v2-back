import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface AuthSaltTable {
  uid: string;
  salt: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

export type AuthSalt = Selectable<AuthSaltTable>;
export type NewAuthSalt = Insertable<AuthSaltTable>;
export type AuthSaltUpdate = Updateable<AuthSaltTable>;
