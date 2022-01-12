import { FastifyReply, FastifyRequest } from 'fastify';
import { TransportMultiOptions, pino } from 'pino';

import config from './config';

const LOG_FOLDER = 'logs';
const ALL_LOGS_FILE_NAME = 'all';
const ERROR_LOGS_FILE_NAME = 'error';

const serializers = {
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
};

const targets = [
  {
    level: 'trace',
    target: 'pino/file',
    options: { destination: `./${LOG_FOLDER}/${ALL_LOGS_FILE_NAME}.json` },
  },
  {
    level: 'error',
    target: 'pino/file',
    options: { destination: `./${LOG_FOLDER}/${ERROR_LOGS_FILE_NAME}.json` },
  },
];

const transportConf = pino.transport(<TransportMultiOptions>{
  level: config.LOG_LEVEL,
  serializers,
  targets,
});

const logger = pino(transportConf);

export default logger;
