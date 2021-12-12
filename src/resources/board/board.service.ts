import { validate } from 'uuid';
import * as userRepository from './board.memory.repository';
import * as taskRepository from '../task/task.memory.repository';
import { Board, routerHandler } from '../../common/type';

type ReqParams = { boardId: string };

export const getAll: routerHandler = async (req, reply) => {
  reply.send(userRepository.getAll());
};

export const getOne: routerHandler = async (req, reply) => {
  const { boardId } = req.params as ReqParams;

  if (!validate(boardId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = userRepository.getOne(boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  reply.send(isRemove);
};

export const create: routerHandler = async (req, reply) => {
  reply.code(201).send(userRepository.create(req.body as Board));
};

export const update: routerHandler = async (req, reply) => {
  const { boardId } = req.params as ReqParams;
  if (!validate(boardId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = userRepository.update(boardId, req.body as Board);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  reply.send(isUpdated);
};

export const remove: routerHandler = async (req, reply) => {
  const { boardId } = req.params as ReqParams;
  if (!validate(boardId)) {
    reply.code(400).send({ message: 'User id is not valid' });
  }
  taskRepository.removeTaskByBoardId(boardId);
  const isRemove = userRepository.remove(boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  reply.send(isRemove);
};
