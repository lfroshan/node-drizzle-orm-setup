import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import session from 'express-session';

import todoRouter from './route/todo/todo.route';
import testRouter from './route/test/test.route';
import { ENV_CONFIGS } from './config/envConfigs';
import studentRouter from './route/user/user.route';
import { STATUS_CODES } from './constants/statusCodes';
import { addModifiedDateToRequestData } from './middleware/addModifiedDate';
import requestErrorHandler from './middleware/requestErrorHandler.middleware';

const app = express();

app.use(cors());

app.use(helmet());

app.use(session({
  resave: true,
  saveUninitialized: true,
  // set a custom name for the session cookie
  name: ENV_CONFIGS.customCookieName,
  // a secure secret key for session encryption
  secret: ENV_CONFIGS.sessionEncryptionKey,
}));

app.use(express.json());

app.use(addModifiedDateToRequestData);

// Route for checking the status of the server.
app.use("/health", async (req, res) => {
  res.status(200).json({
    status: STATUS_CODES.OK,
    message: 'Server is running'
  })
})

app.use('/api/v1/users', studentRouter);
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/test', testRouter);

// Catch and return any error here!
app.use(requestErrorHandler);

export default app;
