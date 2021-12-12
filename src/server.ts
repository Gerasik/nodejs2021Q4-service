import config from './common/config';
import app from './app';

const PORT = config.PORT as string;

const start = async () => {
  try {
    console.log(`App is running on http://localhost:${PORT}`);
    await app.listen(PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
