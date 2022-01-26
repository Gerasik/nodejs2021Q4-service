import { Connection, createConnection } from 'typeorm';
import 'reflect-metadata';
import ormConfig from '../common/ormconfig';

let dbConnection: Connection | undefined;

/**
 * Initializes the database connection
 * @returns Promise<void>
 */
const connectPostrgess = async (): Promise<void> => {
  try {
    if (!dbConnection) {
      console.log('Creating new DB connection...');
      dbConnection = await createConnection(ormConfig);
    }

    if (dbConnection && !dbConnection.isConnected) {
      console.log('Connecting to DB...');
      await dbConnection.connect();
    }
    console.log('DB successfully Connected...');
    await dbConnection.runMigrations();
    console.log('Migrations completed...');
  } catch (e) {
    console.error(e);
    console.log('DB Error: DB is not connected!');
    process.exit(1);
  }
};

export default connectPostrgess;
