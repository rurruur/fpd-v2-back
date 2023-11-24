import { BadRequestException, Injectable } from '@nestjs/common';
import { DB } from '../database/database';
import { InjectDB } from '../database/kysely.module';

@Injectable()
export class AuthRepository {
  constructor(@InjectDB() private readonly db: DB) {}

  async findUser(uid: string) {
    return this.db.selectFrom('authUser').where('uid', '=', uid).executeTakeFirstOrThrow();
  }

  async findUserWithSaltByEmail(email: string) {
    return this.db
      .selectFrom('authUser as au')
      .innerJoin('authSalt as as', 'au.uid', 'as.uid')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirstOrThrow(() => new BadRequestException('가입되지 않은 이메일입니다.'));
  }

  async findUserByEmailOrName(email: string, name: string) {
    return this.db
      .selectFrom('authUser')
      .select(['email', 'name'])
      .where((eb) => eb.or([eb('email', '=', email), eb('name', '=', name)]))
      .execute();
  }

  async insertUser(uid: string, email: string, name: string, password: string) {
    return this.db.insertInto('authUser').values({ uid, email, name, password }).execute();
  }

  async insertSalt(uid: string, salt: string) {
    return this.db.insertInto('authSalt').values({ uid, salt }).execute();
  }
}
