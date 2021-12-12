const { validate } = require('uuid');

const userRepository = require('./board.memory.repository');
const taskRepository = require('../task/task.memory.repository');

exports.getAll = () => userRepository.getAll();

exports.getOne = (req, reply) => {
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

exports.create = (req, reply) => {
  reply.code(201).send(userRepository.create(req.body));
};

exports.update = (req, reply) => {
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

exports.remove = (req, reply) => {
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
