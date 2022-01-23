import { FastifyPluginAsync } from 'fastify';
import { loginService } from './login.service';

const mainUrl = '/login';

const loginScheme = {
  handler: loginService,
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
      },
    },
  },
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.post(mainUrl, loginScheme);
};

export default routes;
