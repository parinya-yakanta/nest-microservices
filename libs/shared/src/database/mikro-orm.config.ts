import { Connection, IDatabaseDriver, Options } from '@mikro-orm/core';

interface DbConfigOptions<TDriver extends IDatabaseDriver<Connection>> {
  driver: new (...args: any[]) => TDriver;
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
  nodeEnv: string;
  entities: any[];
}

export function createMikroOrmConfig<
  TDriver extends IDatabaseDriver<Connection>,
>(options: DbConfigOptions<TDriver>): Options<TDriver> {
  const isProd = options.nodeEnv === 'production';

  return {
    driver: options.driver,

    host: options.host,
    port: options.port,
    user: options.user,
    password: options.password,
    dbName: options.dbName,

    entities: options.entities,

    debug: !isProd,

    pool: {
      min: isProd ? 5 : 1,
      max: isProd ? 20 : 5,
    },

    ...(isProd && {
      driverOptions: {
        connection: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
    }),
  };
}