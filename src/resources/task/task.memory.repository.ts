import { v1 as generateId } from 'uuid';
import { Task } from '../../common/type';

const tasks: Task[] = [
  {
    id: 'fc33b650-5607-11ec-9d78-6598ce783360',
    title: 'first task',
    description: 'myTask',
    order: 1,
    userId: '26d81690-55da-11ec-9935-61a804967ac6',
    boardId: 'e5a17900-5606-11ec-9b5e-a16e10427e00',
    columnId: '',
  },
];

/**
 * Return an array of Tasks
 * @returns array of Tasks
 */
export const getAll = () => tasks;

/**
 * Return task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 * @returns Task object
 */
export const getOne = (id: string, boardId: string) => {
  const task = tasks.find((i) => i.id === id && i.boardId === boardId);
  return task;
};

/**
 * Return new task with generated id
 *  @param body task object without id
 *  @param boardId board uuid
 * @returns Task object
 */
export const create = (body: Task, boardId: string) => {
  const { description, order, title } = body;
  const newTask = {
    id: generateId(),
    description,
    order,
    title,
    boardId,
    columnId: null,
    userId: null,
  };
  tasks.push(newTask);
  return newTask;
};

/**
 * Return updated task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 *  @param body task object
 * @returns Task object or null if task not found
 */
export const update = (id: string, boardId: string, body: Task) => {
  const userIndex = tasks.findIndex(
    (i) => i.id === id && i.boardId === boardId
  );
  if (userIndex === -1) {
    return null;
  }
  tasks[userIndex] = { ...tasks[userIndex], ...body };
  return tasks[userIndex];
};

/**
 * Return removed task by id and board id
 *  @param id task uuid
 *  @param boardId board uuid
 * @returns Task object or null if task not found
 */
export const remove = (id: string, boardId: string) => {
  const userIndex = tasks.findIndex(
    (i) => i.id === id && i.boardId === boardId
  );
  const removedUser = tasks[userIndex];
  if (userIndex > -1) {
    tasks.splice(userIndex, 1);
    return removedUser;
  }

  return null;
};

/**
 * Updating the user to null in each task
 *  @param id user uuid
 */
export const updateUserId = (id: string) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === id) {
      tasks[i] = { ...tasks[i], userId: null };
    }
  }
};

/**
 * Update board by board id
 *  @param id board uuid
 */
export const getTaskByBoardId = (id: string) =>
  tasks
    .filter((i) => i.boardId === id)
    .map((i) => ({ id: i.id, title: i.title, order: i.order }));

/**
 * Remove task from board by board id
 *  @param id board uuid
 */
export const removeTaskByBoardId = (id: string) => {
  let doWhile = true;
  while (doWhile) {
    const index = tasks.findIndex((i) => i.boardId === id);
    if (index === -1) {
      doWhile = false;
    } else {
      tasks.splice(index, 1);
    }
  }
};
