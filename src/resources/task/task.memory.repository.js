const { v1: generateId } = require('uuid');

const tasks = [
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

exports.getAll = () => tasks;

exports.getOne = (id, boardId) => {
  const user = tasks.find((i) => i.id === id && i.boardId === boardId);
  return user;
};

exports.create = (body, boardId) => {
  const newTask = {
    id: generateId(),
    columnId: null,
    userId: null,
    ...body,
    boardId,
  };
  tasks.push(newTask);
  return newTask;
};

exports.update = (id, boardId, body) => {
  const userIndex = tasks.findIndex(
    (i) => i.id === id && i.boardId === boardId
  );
  if (userIndex === -1) {
    return null;
  }
  tasks[userIndex] = { ...tasks[userIndex], ...body };
  return tasks[userIndex];
};

exports.remove = (id, boardId) => {
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

exports.updateUserId = (id) => {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].userId === id) {
      console.log(tasks[i].userId, id);
      tasks[i] = { ...tasks[i], userId: null };
    }
  }
};

exports.getTaskByBoardId = (id) =>
  tasks
    .filter((i) => i.boardId === id)
    .map((i) => ({ id: i.id, title: i.title, order: i.order }));

exports.removeTaskByBoardId = (id) => {
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
