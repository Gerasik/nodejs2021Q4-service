import config from './common/config';
import app from './app';
import connectPostrgess from './db/db';

const HOST = config.HOST as string;
const PORT = config.PORT as string;

const start = async () => {
  await connectPostrgess();

  try {
    console.log(`App is running on http://${HOST}:${PORT}`);
    await app.listen(PORT, HOST);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
