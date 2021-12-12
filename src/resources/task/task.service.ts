import { validate } from 'uuid';
import { routerHandler, Task } from '../../common/type';
import * as taskRepository from './task.memory.repository';

type ReqParams = {
  taskId: string;
  boardId: string;
};

export const getAll: routerHandler = async (req, reply) => {
  reply.send(taskRepository.getAll());
};

export const getOne: routerHandler = async (req, reply) => {
  const { taskId, boardId } = req.params as ReqParams;

  if (!validate(taskId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.getOne(taskId, boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  reply.send(isRemove);
};

export const create: routerHandler = async (req, reply) => {
  const { boardId } = req.params as ReqParams;

  reply.code(201).send(taskRepository.create(req.body as Task, boardId));
};

export const update: routerHandler = async (req, reply) => {
  const { taskId, boardId } = req.params as ReqParams;
  if (!validate(taskId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = taskRepository.update(taskId, boardId, req.body as Task);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  reply.send(isUpdated);
};

export const remove: routerHandler = async (req, reply) => {
  const { taskId, boardId } = req.params as ReqParams;
  if (!validate(taskId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.remove(taskId, boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  reply.send(isRemove);
};
