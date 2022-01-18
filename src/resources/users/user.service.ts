import { validate } from 'uuid';
import * as userRepository from './user.memory.repository';
import * as taskRepository from '../task/task.memory.repository';
import { routerHandler, User } from '../../common/type';

type ReqParams = { userId: string };

export const getAll: routerHandler = async (req, reply) => {
  reply.send(await userRepository.getAll());
};

export const getOne: routerHandler = async (req, reply) => {
  const { userId } = req.params as ReqParams;

  if (!validate(userId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = await userRepository.getOne(userId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  reply.send(await isRemove);
};

export const create: routerHandler = async (req, reply) => {
  const { password, ...newUser } = await userRepository.create(
    req.body as User
  );
  reply.code(201).send(newUser);
};

export const update: routerHandler = async (req, reply) => {
  const { userId } = req.params as ReqParams;
  if (!validate(userId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = await userRepository.update(userId, req.body as User);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  reply.send(isUpdated);
};

export const remove: routerHandler = async (req, reply) => {
  const { userId } = req.params as ReqParams;
  if (!validate(userId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }
  taskRepository.updateUserId(userId);
  const isRemove = await userRepository.remove(userId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${userId} did not found` });
  }
  reply.send(isRemove);
};
