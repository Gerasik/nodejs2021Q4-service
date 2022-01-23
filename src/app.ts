import fastify, { FastifyPluginCallback } from 'fastify';
import FastifyPlugin from 'fastify-swagger';
import userRoute from './resources/users/user.router';
import boardRoute from './resources/board/board.router';
import taskRoute from './resources/task/task.router';
import loginRoute from './resources/login/login.router';
import logger from './common/logger';

const app = fastify({
  logger,
});

const swaggerConfig = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api', version: 1 },
  },
};

app.register(FastifyPlugin as FastifyPluginCallback, swaggerConfig);

app.register(userRoute);
app.register(boardRoute);
app.register(taskRoute);
app.register(loginRoute);

export default app;
