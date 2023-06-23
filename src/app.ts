import cors from 'cors';
import express, { Application } from 'express';

const app: Application = express();

// parser
app.use([express.json(), cors()]);

// routes
import userRoutes from './user/user.route';

app.use('/api/v1/users', userRoutes);

export default app;
