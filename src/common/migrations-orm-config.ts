export = {
  type: 'postgres',
  name: 'postgresAppConnection',
  synchronize: false,
  host: 'localhost',
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  port: '5432',
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  migrationsTableName: 'custom_migration_table',
  cli: {
    migrationsDir: './src/migrations',
    entitiesDir: './src/entities',
  },
};
