import { v1 as generateId } from 'uuid';

const users = [
  {
    id: '26d81690-55da-11ec-9935-61a804967ac6',
    name: 'Yauheni',
    login: 'login',
    password: 'password',
  },
];

export const getAll = () => users;

export const getOne = (id) => {
  const user = users.find((i) => i.id === id);
  return user;
};

export const create = (body) => {
  const newUser = { id: generateId(), ...body };
  users.push(newUser);
  const { password, ...req } = newUser;
  return { ...req };
};

export const update = (id, body) => {
  const userIndex = users.findIndex((i) => i.id === id);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { ...users[userIndex], ...body };
  return users[userIndex];
};

export const remove = (id) => {
  const userIndex = users.findIndex((i) => i.id === id);
  const removedUser = users[userIndex];
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    return removedUser;
  }

  return null;
};
