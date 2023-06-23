import mongoose from 'mongoose';
import app from './app';
import config from './config';
import logger from './utils/logger.util';

(async () => {
  try {
    const { port, db } = config;
    const { user, password, port: db_port, name } = db;

    const MONGO_URI = `mongodb://${user}:${password}@mongo:${db_port}/${name}?authSource=admin`;
    const { connection } = await mongoose.connect(MONGO_URI);
    logger.info(`Mongodb connected : ${connection.host}`);

    app.listen(port, () => console.info(`Server listening on ${port}`));
  } catch (err) {
    logger.error(`Error: ${err}`);
  }
})();
