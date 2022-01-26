import db from '../../common/database';
import { Task } from '../../common/type';
import TaskEntity from '../../entities/task';

/**
 * Return an array of Tasks
 * @returns array of Tasks
 */
export const getAll = async () => {
  const taskList = await db(TaskEntity).find({ where: {} });
  return taskList;
};

/**
 * Return task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 * @returns Task object
 */
export const getOne = async (id: string, boardId: string) => {
  const task = await db(TaskEntity).findOne({ boardId, id });
  return task;
};

/**
 * Return new task with generated id
 *  @param body task object without id
 *  @param boardId board uuid
 * @returns Task object
 */
export const create = async (body: Task, boardId: string) => {
  const { description, order, title } = body;
  const newTask = await db(TaskEntity).create({
    description,
    order,
    title,
    boardId,
    columnId: null,
    userId: null,
  });

  const answer = await db(TaskEntity).save(newTask);

  return answer;
};

/**
 * Return updated task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 *  @param body task object
 * @returns Task object or null if task not found
 */
export const update = async (id: string, boardId: string, body: Task) => {
  const resultTask: TaskEntity | undefined = await db(TaskEntity).findOne({
    boardId,
    id,
  });

  if (!resultTask) return null;

  await db(TaskEntity).update(resultTask.id, body);

  const updatedTask = await db(TaskEntity).findOne({ boardId, id });

  return updatedTask || null;
};

/**
 * Return removed task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 * @returns Task object or null if task not found
 */
export const remove = async (id: string, boardId: string) => {
  const deleteResult = await db(TaskEntity).delete({ boardId, id });

  return !!deleteResult.affected;
};

/**
 * Updating the user to null in each task
 *  @param id user uuid
 */
export const updateUserId = async (id: string) => {
  await db(TaskEntity).update({ userId: id }, { userId: null });
};

/**
 * Update board by board id
 *  @param id board uuid
 */
export const getTaskByBoardId = async (id: string) => {
  const resultTasks: TaskEntity[] = await db(TaskEntity).find({ boardId: id });

  return resultTasks.length === 0 ? null : resultTasks;
};

/**
 * Remove task from board by board id
 *  @param id board uuid
 */
export const removeTaskByBoardId = async (id: string) => {
  const deleteResult = await db(TaskEntity).delete({ boardId: id });

  return !!deleteResult.affected;
};
