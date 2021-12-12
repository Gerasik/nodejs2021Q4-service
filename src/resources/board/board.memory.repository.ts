import { v1 as generateId } from 'uuid';
import { Board } from '../../common/type';

const boards: Board[] = [
  {
    id: 'e5a17900-5606-11ec-9b5e-a16e10427e00',
    title: 'myBoard',
    columns: [],
  },
];

/**
 * Return an array of board
 * @returns array of Board
 */
export const getAll = () => {
  console.log('asa');
  return boards;
};

/**
 * Return one board
 *  @param id board uuid
 * @returns Board object
 */
export const getOne = (id: string) => {
  const board = boards.find((i) => i.id === id);
  return board;
};

/**
 * Return new board with generated id
 *  @param body board without id
 * @returns Board object
 */
export const create = (body: Omit<Board, 'id'>) => {
  const newBoard = { id: generateId(), ...body };
  boards.push(newBoard);
  return newBoard;
};

/**
 * Return updated board by id
 *  @param id board uuid
 *  @param body Board object
 * @returns Board object or null if board with id not found
 */
export const update = (id: string, body: Board) => {
  const boardIndex = boards.findIndex((i) => i.id === id);
  if (boardIndex === -1) {
    return null;
  }
  boards[boardIndex] = { ...boards[boardIndex], ...body };
  return boards[boardIndex];
};

/**
 * Return removed user by id
 *  @param id board uuid
 * @returns Board object or null if board not found
 */
export const remove = (id: string) => {
  const boardIndex = boards.findIndex((i) => i.id === id);
  const removedBoard = boards[boardIndex];
  if (boardIndex > -1) {
    boards.splice(boardIndex, 1);
    return removedBoard;
  }

  return null;
};
