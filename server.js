import app from './server/express';
// const app = require('./server/express');
import config from './config';

const { port } = config;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// // require("./route/UserRoute")(app);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

export const server = async () => {
  await app.listen(port, () => {
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
