import { FastifyPluginAsync } from 'fastify';
import { getAll, getOne, create, update, remove } from './task.service';
import { Task } from './task.model';

const mainUrl = '/boards/:boardId/tasks';

const getAllScheme = {
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
  handler: getOne,
  schema: {
    response: {
      200: Task,
    },
  },
};

const createScheme = {
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
  handler: update,
  schema: {
    response: {
      200: Task,
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
  fastify.get(`${mainUrl}/:taskId`, getOneScheme);
  fastify.post(mainUrl, createScheme);
  fastify.put(`${mainUrl}/:taskId`, updateScheme);
  fastify.delete(`${mainUrl}/:taskId`, deleteScheme);
};

export default routes;
