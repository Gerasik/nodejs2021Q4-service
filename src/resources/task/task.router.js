const { getAll, getOne, create, update, remove } = require('./task.service');
const { User } = require('./task.model');

const mainUrl = '/boards/:boardId/tasks';

const routes = [
  {
    method: 'GET',
    url: mainUrl,
    handler: getAll,
    schema: {
      response: {
        200: {
          type: 'array',
          users: User,
        },
      },
    },
  },
  {
    method: 'GET',
    url: `${mainUrl}/:taskId`,
    handler: getOne,
    schema: {
      response: {
        200: User,
      },
    },
  },
  {
    method: 'POST',
    url: mainUrl,
    handler: create,
    schema: {
      body: {
        type: 'object',
        required: ['name', 'login', 'password'],
        properties: {
          name: { type: 'string' },
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        201: User,
      },
    },
  },
  {
    method: 'PUT',
    url: `${mainUrl}/:taskId`,
    handler: update,
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: User,
      },
    },
  },
  {
    method: 'DELETE',
    url: `${mainUrl}/:taskId`,
    handler: remove,
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
];

module.exports = routes;
