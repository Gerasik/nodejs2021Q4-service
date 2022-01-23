import bcrypt from 'bcrypt';
import { routerHandler } from '../../common/type';
import { getUserByLogin } from '../users/user.memory.repository';

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

    reply.send({ token: 'fsdfsdfsdfs' });
  }
};
