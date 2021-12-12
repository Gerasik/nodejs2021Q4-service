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

export const getAll = () => tasks;

export const getOne = (id: string, boardId: string) => {
  const user = tasks.find((i) => i.id === id && i.boardId === boardId);
  return user;
};

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

export const updateUserId = (id: string) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === id) {
      tasks[i] = { ...tasks[i], userId: null };
    }
  }
};

export const getTaskByBoardId = (id: string) =>
  tasks
    .filter((i) => i.boardId === id)
    .map((i) => ({ id: i.id, title: i.title, order: i.order }));

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
