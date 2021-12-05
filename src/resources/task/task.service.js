const { validate } = require('uuid');

const taskRepository = require('./task.memory.repository');

exports.getAll = () => taskRepository.getAll();

exports.getOne = (req, reply) => {
  const { taskId } = req.params;

  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.getOne(taskId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isRemove;
};

exports.create = (req, reply) => {
  reply.code(201).send(taskRepository.create(req.body));
};

exports.update = (req, reply) => {
  const { taskId } = req.params;
  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isUpdated = taskRepository.update(taskId, req.body);

  if (!isUpdated) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isUpdated;
};

exports.remove = (req, reply) => {
  const { taskId } = req.params;
  if (!validate(taskId)) {
    return reply.code(400).send({ message: 'User id is not valid' });
  }

  const isRemove = taskRepository.remove(taskId);

  if (!isRemove) {
    reply.code(404).send({ message: `user with id: ${taskId} did not found` });
  }
  return isRemove;
};
