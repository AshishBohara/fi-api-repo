/*
The following code contains source code for different middlewae functions used in the application.
*/

import _ from 'lodash';
import config from '../../config';

const { environment } = config;

export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(` Not Found the - ${req.originalUrl}`);
  next(error);
};

export const headerFunction = (req, res, next) => {
  res.append('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.append('Connection', 'close');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Accept-Language'].join(', '),
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
};

export const unauthorizedError = (err, _req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
  }
  next();
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    data: {
      msg: err.message,
      stack: environment === 'production' ? ' ther is error' : err.stack,
    },
  });
  next();
};

export const extendedRequestMiddleware = (req, res, next) => {
  req.allParams = () => _.merge(req.params, req.query, req.body);

  res.set('x-application-identifier', `boilerplate-${environment}`);

  res.ok = (resPayload = {}) => {
    if (typeof resPayload === 'string') {
      return res.send({
        statusCode: 200,
        status: resPayload,
        data: {},
        message: res.__(resPayload),
      });
    }

    const { message = 'SUCCESS', data = {} } = resPayload;
    return res.status(200).send({
      statusCode: 200,
      status: message,
      message: res.__(message),
      data,
    });
  };

  res.created = ({ data, message }) => {
    return res.status(201).send({
      statusCode: 201,
      data: data,
      message: res.__(message),
    });
  };

  res.alredyExist = ({ data = {}, message }) => {
    return res.status(201).send({
      statusCode: 201,
      data: data,
      message: res.__(message),
    });
  };

  res.error = (resPayload, _debugMessage) => {
    if (typeof resPayload === 'string') {
      return res.status(400).send({
        statusCode: 400,
        status: resPayload,
        error: res.__(resPayload),
        message: res.__(resPayload),
        data: {},
      });
    }

    const { statusCode = 400, message = 'BAD_REQUEST', data = {} } = resPayload;

    return res.status(statusCode).send({
      statusCode,
      status: message,
      message: res.__(message),
      error: res.__(message),
      data,
    });
  };

  res.internalServerError = (_e) => {
    return res.status(500).send({
      statusCode: 500,
      status: 'SOME_ERROR_OCCURRED',
      message: res.__('SOME_ERROR_OCCURRED'),
      error: res.__('SOME_ERROR_OCCURRED'),
      data: {},
    });
  };

  res.unauthorized = (_message = '') => {
    return res.status(401).send({
      statusCode: 401,
      status: 'UNAUTHORIZED',
      message: res.__('UNAUTHORIZED'),
      data: {},
      error: res.__('UNAUTHORIZED'),
    });
  };

  res.forbidden = () => {
    return res.status(403).send({
      statusCode: 403,
      status: 'FORBIDDEN',
      message: res.__('FORBIDDEN'),
      data: {},
      error: res.__('FORBIDDEN'),
    });
  };

  next();
};
