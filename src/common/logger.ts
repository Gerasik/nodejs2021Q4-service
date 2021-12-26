import { FastifyReply, FastifyRequest } from 'fastify';
import { TransportMultiOptions, pino } from 'pino';

import config from './config';

const transportConf = pino.transport(<TransportMultiOptions>{
  level: config.LOG_LEVEL,
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
        query: request.query,
      };
    },
  },
  targets: [
    {
      level: 'trace',
      target: 'pino/file',
      options: { destination: config.LOG_FILE_PATH },
    },
    {
      level: 'error',
      target: 'pino/file',
      options: { destination: config.ERR_FILE_PATH },
    },
  ],
});

const logger = pino(transportConf);

export default logger;
