import { DynamicModule, Inject, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { Kysely, KyselyConfig } from 'kysely';
import { Database } from './database';

export const InjectDB = () => Inject(KYSELY_CONNECTION_TOKEN);

export const KYSELY_CONNECTION_TOKEN = 'KYSELY_MODULE_CONNECTION_TOKEN';
export const KYSELY_OPTIONS_TOKEN = 'KYSELY_MODULE_OPTIONS_TOKEN';

export interface KyselyModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<KyselyConfig> | KyselyConfig;
  inject?: any[];
}

@Module({})
export class KyselyModule {
  public static forRootAsync(options: KyselyModuleAsyncOptions): DynamicModule {
    const provider: Provider = {
      inject: [KYSELY_OPTIONS_TOKEN],
      provide: KYSELY_CONNECTION_TOKEN,
      useFactory: (config: KyselyConfig) => new Kysely<Database>(config),
    };

    return {
      imports: options.imports,
      exports: [provider],
      module: KyselyModule,
      providers: [
        {
          provide: KYSELY_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        provider,
      ],
      global: true,
    };
  }
}
