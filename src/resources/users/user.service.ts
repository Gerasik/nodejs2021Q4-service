const { validate } = require('uuid');

const userRepository = require('./user.memory.repository');
const taskRepository = require('../task/task.memory.repository');

exports.getAll = () => userRepository.getAll();

exports.getOne = (req, reply) => {
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

exports.create = (req, reply) => {
  reply.code(201).send(userRepository.create(req.body));
};

exports.update = (req, reply) => {
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

exports.remove = (req, reply) => {
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
