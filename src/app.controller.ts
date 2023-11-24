import { Controller, Get } from '@nestjs/common';
import { Kysely } from 'kysely';
import { AppService } from './app.service';
import { Database } from './database/database';
import { InjectDB } from './database/kysely.module';

@Controller()
export class AppController {
  constructor(@InjectDB() private readonly db: Kysely<Database>, private readonly appService: AppService) {}

  @Get()
  async getHello() {
    console.log(await this.db.selectFrom('authUser').selectAll().execute());
    return this.appService.getHello();
  }
}
