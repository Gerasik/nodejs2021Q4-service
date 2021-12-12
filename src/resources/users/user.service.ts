import { validate } from 'uuid';
import * as userRepository from './user.memory.repository';
import * as taskRepository from '../task/task.memory.repository';
import { routerHandler, User } from '../../common/type';

type ReqParams = { userId: string };

export const getAll = () => userRepository.getAll();

export const getOne: routerHandler = (req, reply) => {
  const { userId } = req.params as ReqParams;

  if (!validate(userId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = userRepository.getOne(userId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  return isRemove;
};

export const create: routerHandler = (req, reply) => {
  reply.code(201).send(userRepository.create(req.body as User));
};

export const update: routerHandler = (req, reply) => {
  const { userId } = req.params as ReqParams;
  if (!validate(userId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = userRepository.update(userId, req.body as User);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  return isUpdated;
};

export const remove: routerHandler = (req, reply) => {
  const { userId } = req.params as ReqParams;
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
