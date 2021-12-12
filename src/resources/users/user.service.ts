import { validate } from 'uuid';

import userRepository from './user.memory.repository';
import taskRepository from '../task/task.memory.repository';

export const getAll = () => userRepository.getAll();

export const getOne = (req, reply) => {
  const { userId } = req.params;

  if (!validate(userId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = userRepository.getOne(userId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  return isRemove;
};

export const create = (req, reply) => {
  reply.code(201).send(userRepository.create(req.body));
};

export const update = (req, reply) => {
  const { userId } = req.params;
  if (!validate(userId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = userRepository.update(userId, req.body);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  return isUpdated;
};

export const remove = (req, reply) => {
  const { userId } = req.params;
  if (!validate(userId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }
  taskRepository.updateUserId(userId);
  const isRemove = userRepository.remove(userId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  return isRemove;
};
