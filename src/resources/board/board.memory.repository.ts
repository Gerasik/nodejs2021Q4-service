import { v1 as generateId } from 'uuid';
import { Board } from '../../common/type';

const boards: Board[] = [
  {
    id: 'e5a17900-5606-11ec-9b5e-a16e10427e00',
    title: 'myBoard',
    columns: [],
  },
];

export const getAll = async () => boards;

export const getOne = (id: string) => {
  const user = boards.find((i) => i.id === id);
  return user;
};

export const create = (body: Omit<Board, 'id'>) => {
  const newBoard = { id: generateId(), ...body };
  boards.push(newBoard);
  return newBoard;
};

export const update = (id: string, body: Board) => {
  const userIndex = boards.findIndex((i) => i.id === id);
  if (userIndex === -1) {
    return null;
  }
  boards[userIndex] = { ...boards[userIndex], ...body };
  return boards[userIndex];
};

export const remove = (id: string) => {
  const userIndex = boards.findIndex((i) => i.id === id);
  const removedUser = boards[userIndex];
  if (userIndex > -1) {
    boards.splice(userIndex, 1);
    return removedUser;
  }

  return null;
};
