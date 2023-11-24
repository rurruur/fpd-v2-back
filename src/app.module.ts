import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CamelCasePlugin, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { KyselyModule } from './database/kysely.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    }),
    KyselyModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: new MysqlDialect({
          pool: createPool({
            database: configService.get<string>('DB_NAME'),
            host: configService.get<string>('DB_HOST'),
            user: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            port: configService.get<number>('DB_PORT'),
            connectionLimit: configService.get<number>('DB_CONNECTION_LIMIT'),
          }),
        }),
        log: ['query', 'error'],
        plugins: [new CamelCasePlugin()],
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
