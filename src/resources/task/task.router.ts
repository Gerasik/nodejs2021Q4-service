import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './task.service';
import { Task } from './task.model';
import checkJWT from '../login/check-jwt';

const mainUrl = '/boards/:boardId/tasks';

const getAllScheme = {
  preHandler: checkJWT,
  handler: getAll,
  schema: {
    response: {
      200: {
        type: 'array',
        users: Task,
      },
    },
  },
};

const getOneScheme = {
  preHandler: checkJWT,
  handler: getOne,
  schema: {
    response: {
      200: Task,
    },
  },
};

const createScheme = {
  preHandler: checkJWT,
  handler: create,
  schema: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        order: { type: 'number' },
        taskId: { type: 'string' },
        boardId: { type: 'string' },
        columnId: { type: 'string' },
      },
    },
    response: {
      201: Task,
    },
  },
};

const updateScheme = {
  preHandler: checkJWT,
  handler: update,
  schema: {
    response: {
      200: Task,
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
  fastify.get(`${mainUrl}/:taskId`, getOneScheme);
  fastify.post(mainUrl, createScheme);
  fastify.put(`${mainUrl}/:taskId`, updateScheme);
  fastify.delete(`${mainUrl}/:taskId`, deleteScheme);
};

export default routes;
