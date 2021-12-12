import { FastifyReply, FastifyRequest } from 'fastify';

export type routerHandler = (req: FastifyRequest, res: FastifyReply) => void;
