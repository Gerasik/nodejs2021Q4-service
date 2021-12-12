import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './user.service';
import { User } from './user.model';

const mainUrl = '/users';

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
    url: `${mainUrl}/:userId`,
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
    url: `${mainUrl}/:userId`,
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
    url: `${mainUrl}/:userId`,
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

export default routes;

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get(mainUrl, getAllScheme(itemUserScheme(), getUsers));
  fastify.get(`${mainUrl}/:userId`, getOneScheme(itemUserScheme(), getUser));
  fastify.post(mainUrl, postUserScheme);
  fastify.put(`${mainUrl}/:userId`, putUserScheme);
  fastify.delete(`${mainUrl}/:userId`, deleteScheme(deleteUser));
};
export default routes;
