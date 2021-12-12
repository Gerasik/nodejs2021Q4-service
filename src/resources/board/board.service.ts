import { validate } from 'uuid';
import userRepository from './board.memory.repository';
import taskRepository from '../task/task.memory.repository';

export const getAll = () => userRepository.getAll();

export const getOne = (req, reply) => {
  const { boardId } = req.params;

  if (!validate(boardId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = userRepository.getOne(boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  return isRemove;
};

export const create = (req, reply) => {
  reply.code(201).send(userRepository.create(req.body));
};

export const update = (req, reply) => {
  const { boardId } = req.params;
  if (!validate(boardId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = userRepository.update(boardId, req.body);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  return isUpdated;
};

export const remove = (req, reply) => {
  const { boardId } = req.params;
  if (!validate(boardId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }
  taskRepository.removeTaskByBoardId(boardId);
  const isRemove = userRepository.remove(boardId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${boardId} did not found` });
  }
  return isRemove;
};
