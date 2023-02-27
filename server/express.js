import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import i18n from 'i18n';
import path from 'path';
import cors from 'cors';

import config from '../config';
import dbConnection from './connection';
import routerSetup from './routing';
import { errorHandler, extendedRequestMiddleware, notFound, unauthorizedError } from './middleware';

const app = express();

const { availableLocals, projectRoot, defaultLanguage, whiteListOrigin } = config;

i18n.configure({
  locales: availableLocals,
  directory: path.join(projectRoot, 'server', 'locals'),
  defaultLocale: defaultLanguage,
});

// Allow only Whitlisted URLs.

const whitelist = (whiteListOrigin || '').split(',').filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },

  optionsSuccessStatus: 200,
  methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['X-Requested-with', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

app.use('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('showstackError', true);

// app.all('*', headerFunction);
app.use(i18n.init);
app.use(compression());
app.use(helmet());
app.use(extendedRequestMiddleware);

// Route for server health check

app.route('/health-fi').get(async (req, res, next) => {
  return res.status(200).json({
    msg: 'Success',
    status: 200,
    data: {
      message: 'This is FI API',
    },
  });
});

// DB connection and routing configuration

(async () => {
  const db = await dbConnection();
  routerSetup(app, db);
  app.use(unauthorizedError);
  app.use(errorHandler);
  app.use(notFound);
})();

export default app;
