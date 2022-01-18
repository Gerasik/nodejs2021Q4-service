import { ConnectionOptions } from 'typeorm';
import config from './config';

const ormConfig = {
  type: 'postgres',
  name: 'postgres-app-connection',
  synchronize: false,
  host: config.POSTGRES_HOST,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  port: config.POSTGRES_PORT,
  autoReconnect: true,
  entities: [config.TYPEORM_ENTITIES],
  migrations: [config.TYPEORM_MIGRATIONS],
};

export default ormConfig as ConnectionOptions;
