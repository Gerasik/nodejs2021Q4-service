import { v1 as generateId } from 'uuid';
import { User } from '../../common/type';

const users: User[] = [
  {
    id: '26d81690-55da-11ec-9935-61a804967ac6',
    name: 'Yauheni',
    login: 'login',
    password: 'password',
  },
];

/**
 * Return an array of users
 * @returns array of Users
 */
export const getAll = () => users;

/**
 * Return one user
 *  @param id user uuid
 * @returns Users object
 */
export const getOne = (id: string) => {
  const user = users.find((i) => i.id === id);
  return user;
};

/**
 * Return new user with generated id
 *  @param body user without idz
 * @returns Users object without password
 */
export const create = (body: Omit<User, 'id'>) => {
  const newUser = { id: generateId(), ...body };
  users.push(newUser);
  return { id: newUser.id, name: newUser.name, login: newUser.login };
};

/**
 * Return updated user by id
 *  @param id user uuid
 *  @param body user object
 * @returns Users object or null if user with id not found
 */
export const update = (id: string, body: User) => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { ...users[userIndex], ...body };
  return users[userIndex];
};

/**
 * Return removed user by id
 *  @param id user uuid
 * @returns Users object or null if user not found
 */
export const remove = (id: string) => {
  const userIndex = users.findIndex((i) => i.id === id);
  const removedUser = users[userIndex];
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    return removedUser;
  }

  return null;
};
