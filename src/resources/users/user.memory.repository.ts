import { User } from '../../common/type';
import db from '../../common/db';
import UserEntity from '../../entities/user';
import encryptPass from '../../common/encrypt-pass';

/**
 * Return an array of users
 * @returns array of Users
 */
export const getAll = async (): Promise<User[]> => {
  const usersAll = await db(UserEntity).find({ where: {} });

  return usersAll;
};

/**
 * Return one user
 *  @param id user uuid
 * @returns Users object
 */
export const getOne = async (id: string) => {
  const resultUser: User | undefined = await db(UserEntity).findOne(id);
  return resultUser || null;
};

/**
 * Return new user with generated id
 *  @param body user without idz
 * @returns Users object without password
 */
export const create = async (body: Omit<User, 'id'>) => {
  const { password, ...newUserData } = await db(UserEntity).create(body);

  const encryptedPass = await encryptPass(password);

  const answer = await db(UserEntity).save({
    ...newUserData,
    password: encryptedPass,
  });
  return answer;
};

/**
 * Return updated user by id
 *  @param id user uuid
 *  @param body user object
 * @returns Users object or null if user with id not found
 */
export const update = async (id: string, body: User) => {
  const resultUser: User | undefined = await db(UserEntity).findOne(id);

  if (!resultUser) return null;

  await db(UserEntity).update(id, body);

  const updatedUser = await db(UserEntity).findOne(id);

  return updatedUser || null;
};

/**
 * Return removed user by id
 *  @param id user uuid
 * @returns Users object or null if user not found
 */
export const remove = async (id: string) => {
  const deleteResult = await db(UserEntity).delete(id);

  return !!deleteResult.affected;
};

export const getUserByLogin = async (login: string) => {
  const user = await db(UserEntity).findOne({ where: { login } });

  return user || null;
};
