const { getAll, getOne, create, update, remove } = require('./board.service');
const { Board } = require('./board.model');

const mainUrl = '/boards';

const routes = [
  {
    method: 'GET',
    url: mainUrl,
    handler: getAll,
    schema: {
      response: {
        200: {
          type: 'array',
          users: Board,
        },
      },
    },
  },
  {
    method: 'GET',
    url: `${mainUrl}/:boardId`,
    handler: getOne,
    schema: {
      response: {
        200: Board,
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
        required: ['title', 'columns'],
        properties: {
          title: { type: 'string' },
          columns: { type: 'array' },
        },
      },
      response: {
        201: Board,
      },
    },
  },
  {
    method: 'PUT',
    url: `${mainUrl}/:boardId`,
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
        200: Board,
      },
    },
  },
  {
    method: 'DELETE',
    url: `${mainUrl}/:boardId`,
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
