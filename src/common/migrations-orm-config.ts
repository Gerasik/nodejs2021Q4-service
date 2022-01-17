import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  type: 'postgres',
  name: 'postgresAppConnection',
  synchronize: false,
  host: 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  autoReconnect: true,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  },
};
