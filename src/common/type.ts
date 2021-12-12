import { FastifyReply, FastifyRequest } from 'fastify';

export type routerHandler = (
  req: FastifyRequest,
  res: FastifyReply
) => Promise<void>;

export type User = {
  id?: string;
  name: string;
  login: string;
  password: string;
};

export type Task = {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
};

export type Board = {
  id: string;
  title: string;
  columns?: string[];
};
