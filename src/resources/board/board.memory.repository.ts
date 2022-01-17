import { v1 as generateId } from 'uuid';
import db from '../../common/db';
import { Board } from '../../common/type';
import BoardEntity from '../../entities/board';

/**
 * Return an array of board
 * @returns array of Board
 */
export const getAll = async () => {
  const boards = await db(BoardEntity).find({ relations: ['columns'] });

  return boards;
};

/**
 * Return one board
 *  @param id board uuid
 * @returns Board object
 */
export const getOne = async (id: string) => {
  const resultBoard = await db(BoardEntity).findOne(id, {
    relations: ['columns'],
  });

  return resultBoard || null;
};

/**
 * Return new board with generated id
 *  @param body board without id
 * @returns Board object
 */
export const create = async (body: Omit<Board, 'id'>) => {
  const newBoard = { id: generateId(), ...body };

  await db(BoardEntity).save(newBoard as unknown as BoardEntity);

  return newBoard;
};

/**
 * Return updated board by id
 *  @param id board uuid
 *  @param body Board object
 * @returns Board object or null if board with id not found
 */
export const update = async (id: string, body: Board) => {
  const resultBoard = await db(BoardEntity).findOne(id);

  if (!resultBoard) return null;

  const updatedBoard = { ...resultBoard, ...body };

  let savedBoard;

  try {
    await db(BoardEntity).save(updatedBoard as unknown as BoardEntity);
    savedBoard = await db(BoardEntity).findOne(id, { relations: ['columns'] });
  } catch (e) {
    console.error(`FAILED TO UPDATE BOARD: ${e}`);
  }

  return savedBoard || null;
};

/**
 * Return removed user by id
 *  @param id board uuid
 * @returns Board object or null if board not found
 */
export const remove = async (id: string) => {
  const deleteResult = await db(BoardEntity).delete(id);

  return !!deleteResult.affected;
};
