import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import config from '../../common/config';
import { getOne, getUserByLogin } from '../users/user.memory.repository';

const checkJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    reply.code(401).send({ message: `Unauthorized error` });
  } else {
    const splittedHeader = authHeader.split(' ');

    if (
      !(
        authHeader &&
        splittedHeader &&
        splittedHeader[0] === 'Bearer' &&
        splittedHeader[1]
      )
    ) {
      reply.code(401).send({ message: `Unauthorized error` });
    }

    const token = splittedHeader[1];

    const tokenPayload = await new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET_KEY, (err, payload) => {
        if (err) reject(err);

        resolve(payload);
      });
    }).catch((e) => {
      reply.code(401).send({ message: e.message });
    });

    const { userId, login } = tokenPayload as { userId: string; login: string };

    const userById = await getOne(userId);
    if (!userById) {
      reply
        .code(401)
        .send({ message: `Userid defined in Authorization token not found` });
    }

    const userByLogin = await getUserByLogin(login as string);
    if (!userByLogin) {
      reply.code(401).send({
        message: `Username defined in the authorization token not found`,
      });
    }

    return { req, reply };
  }
};
export default checkJWT;
