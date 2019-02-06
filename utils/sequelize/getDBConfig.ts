import get from 'lodash/get';

export const getDBConfig = appKey => {

  let configKey = get(process, 'env.NODE_ENV') === 'test' ? `${appKey}TEST_` : appKey;

  const database = get(process, `env.${configKey}SQL_DATABASE`);
  const username = get(process, `env.${configKey}SQL_USERNAME`);
  const password = get(process, `env.${configKey}SQL_PASSWORD`);
  const dialect = get(process, `env.${configKey}SQL_DIALECT`) || 'postgres';
  const host = get(process, `env.${configKey}SQL_HOST`);
  const port = get(process, `env.${configKey}SQL_PORT`);
  const logging = !!((get(process, `env.${appKey}LOG_SQL`) && get(process, `env.${appKey}LOG_SQL`) !== 'false'));
  const ssl = get(process, `env.${appKey}POSTGRES_SSL`) ? get(process, `env.${appKey}POSTGRES_SSL`) : false;

  const dbOptions = {
    database,
    username,
    password,
    dialect,
    host,
    port,
    logging,
    ssl,
  };

  return dbOptions;
}
