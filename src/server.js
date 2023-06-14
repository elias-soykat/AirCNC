require('dotenv').config();
require('./config/db.config');

const express = require('express');
const routes = require('./routes');

const { errResponder, notFound } = require('./middleware/error.middleware');
const { port } = require('./config/config');

const app = express();
app.use(express.json());

// ROUTES;
app.use('/api/v1', routes);

// ERROR MIDDLEWARE
app.use(notFound);
app.use(errResponder);

app.listen(port, () => console.info(`app listening on ${port}`));

module.exports = app;
