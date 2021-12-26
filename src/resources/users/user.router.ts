import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './user.service';
import { User } from './user.model';

const mainUrl = '/users';

const getAllScheme = {
  handler: getAll,
  schema: {
    response: {
      200: {
        type: 'array',
        users: User,
      },
    },
  },
};

const getOneScheme = {
  handler: getOne,
  schema: {
    response: {
      200: User,
    },
  },
};

const createScheme = {
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
      200: User,
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
  fastify.get(`${mainUrl}/:userId`, getOneScheme);
  fastify.post(mainUrl, createScheme);
  fastify.put(`${mainUrl}/:userId`, updateScheme);
  fastify.delete(`${mainUrl}/:userId`, deleteScheme);
};

export default routes;
