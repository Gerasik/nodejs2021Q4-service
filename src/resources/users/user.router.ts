import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './user.service';
import { User } from './user.model';
import checkJWT from '../login/check-jwt';

const mainUrl = '/users';

const getAllScheme = {
  preHandler: checkJWT,
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
  preHandler: checkJWT,
  handler: getOne,
  schema: {
    response: {
      200: User,
    },
  },
};

const createScheme = {
  preHandler: checkJWT,
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
  preHandler: checkJWT,
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
  preHandler: checkJWT,
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
