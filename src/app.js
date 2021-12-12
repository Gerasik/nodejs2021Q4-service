const fastify = require('fastify')();
const userRoute = require('./resources/users/user.router');
const boardRoute = require('./resources/board/board.router');
const taskRoute = require('./resources/task/task.router');

fastify.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' },
    ],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'name', 'login', 'password'],
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          login: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest(request, reply, next) {
      next();
    },
    preHandler(request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
});

[...userRoute, ...boardRoute, ...taskRoute].forEach((route) => {
  fastify.route(route);
});

fastify.ready((err) => {
  if (err) throw err;
  fastify.swagger();
});

module.exports = fastify;
