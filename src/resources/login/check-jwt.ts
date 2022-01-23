import { FastifyRequest, FastifyReply } from 'fastify';
import config from '../../common/config';

const checkJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization;

  const splitted = authHeader ? authHeader.split(' ') : null;

  if (authHeader && splitted && splitted[0] === 'Bearer' && splitted[1]) {
    const token = splitted[1];

    console.log(`Token: ${token}`);

    return { req, reply };
  }

  reply.code(401).send({ message: `Unauthorized error` });
};
export default checkJWT;
