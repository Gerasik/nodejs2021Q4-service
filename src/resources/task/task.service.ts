import { validate } from 'uuid';

import taskRepository = require('./task.memory.repository');

export const getAll = () => taskRepository.getAll();

export const getOne = (req, reply) => {
  const { taskId, boardId } = req.params;

  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.getOne(taskId, boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isRemove;
};

export const create = (req, reply) => {
  reply.code(201).send(taskRepository.create(req.body, req.params.boardId));
};

export const update = (req, reply) => {
  const { taskId, boardId } = req.params;
  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = taskRepository.update(taskId, boardId, req.body);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isUpdated;
};

export const remove = (req, reply) => {
  const { taskId, boardId } = req.params;
  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.remove(taskId, boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isRemove;
};
