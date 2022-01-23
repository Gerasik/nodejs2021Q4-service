import { FastifyRequest, FastifyReply } from 'fastify';

const checkJWT = async (req: FastifyRequest, res: FastifyReply) => ({
  req,
  res,
});
export default checkJWT;
