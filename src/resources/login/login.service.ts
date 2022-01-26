import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { routerHandler } from '../../common/type';
import { getUserByLogin } from '../users/user.memory.repository';
import config from '../../common/config';

type ReqBody = { login: string; password: string };

export const loginService: routerHandler = async (req, reply) => {
  const { login, password } = req.body as ReqBody;

  const user = await getUserByLogin(login);

  if (!user) {
    reply.code(404).send({ message: `User with login ${login} doesn't exist` });
  } else {
    const encryptedPassword = user.password;

    const isPasswordOk = await bcrypt.compare(password, encryptedPassword);

    if (!isPasswordOk) {
      reply.code(403).send({ message: `Incorrect password` });
    }

    const tokenData = { userId: user.id, login: user.login };

    const token = await jwt.sign(tokenData, config.JWT_SECRET_KEY);

    reply.send({ token });
  }
};
