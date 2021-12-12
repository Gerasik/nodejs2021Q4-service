import { getAll, getOne, create, update, remove } from './task.service';
import { Task } from './task.model';

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
          users: Task,
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
        200: Task,
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
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          order: { type: 'number' },
          userId: { type: 'string' },
          boardId: { type: 'string' },
          columnId: { type: 'string' },
        },
      },
      response: {
        201: Task,
      },
    },
  },
  {
    method: 'PUT',
    url: `${mainUrl}/:taskId`,
    handler: update,
    schema: {
      response: {
        200: Task,
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

export default routes;
