import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './board.service';
import { Board } from './board.model';

const mainUrl = '/boards';

const getAllScheme = {
  handler: getAll,
  schema: {
    response: {
      200: {
        type: 'array',
        users: Board,
      },
    },
  },
};
const getOneScheme = {
  handler: getOne,
  schema: {
    response: {
      200: Board,
    },
  },
};

const createScheme = {
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
};

const updateScheme = {
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
};

const deleteScheme = {
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
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get(mainUrl, getAllScheme);
  fastify.get(`${mainUrl}/:boardId`, getOneScheme);
  fastify.post(mainUrl, createScheme);
  fastify.put(`${mainUrl}/:boardId`, updateScheme);
  fastify.delete(`${mainUrl}/:boardId`, deleteScheme);
};

export default routes;
