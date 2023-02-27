import app from './server/express';
// const app = require('./server/express');
import config from './config';

const { port } = config;

export const server = async () => {
  app.listen(port, () => {
    try {
      console.info(`Express -> server is running on port ${port}`);
    } catch (err) {
      console.log('Expresss -> ', err.message);
    }
  });
};
(() => {
  console.info('Starting the server .......');
  server();
})();
