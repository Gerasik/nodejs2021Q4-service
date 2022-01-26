import { getConnection, EntityTarget, Repository, BaseEntity } from 'typeorm';
import ormConfig from './ormconfig';

const db = <T extends BaseEntity>(entity: EntityTarget<T>): Repository<T> => {
  const connection = getConnection(ormConfig.name);
  const repo = connection.getRepository(entity);
  return repo;
};

export default db;
