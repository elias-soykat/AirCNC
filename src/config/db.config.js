const mongoose = require('mongoose');
const logger = require('../utils/logger.util');
const {
  db: { user, password, port, name },
} = require('./config');

(async () => {
  try {
    const MONGO_URI = `mongodb://${user}:${password}@mongo:${port}/${name}?authSource=admin`;
    const conn = await mongoose.connect(MONGO_URI);

    logger.info(`Mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error : ${error}`);
  }
})();
