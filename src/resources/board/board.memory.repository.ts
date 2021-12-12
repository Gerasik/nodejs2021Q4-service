import { v1 as generateId } from 'uuid';

const boards = [
  {
    id: 'e5a17900-5606-11ec-9b5e-a16e10427e00',
    title: 'myBoard',
    columns: [],
  },
];

export const getAll = () => boards;

export const getOne = (id) => {
  const user = boards.find((i) => i.id === id);
  return user;
};

export const create = (body) => {
  const newUser = { id: generateId(), ...body };
  boards.push(newUser);
  const { password, ...req } = newUser;
  return { ...req };
};

export const update = (id, body) => {
  const userIndex = boards.findIndex((i) => i.id === id);
  if (userIndex === -1) {
    return null;
  }
  boards[userIndex] = { ...boards[userIndex], ...body };
  return boards[userIndex];
};

export const remove = (id) => {
  const userIndex = boards.findIndex((i) => i.id === id);
  const removedUser = boards[userIndex];
  if (userIndex > -1) {
    boards.splice(userIndex, 1);
    return removedUser;
  }

  return null;
};
