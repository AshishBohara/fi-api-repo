import { login, create } from '../../controllers/UsersController';

const UsersRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/user/create`).post(create(db));
  app.route(`${path}/user/login`).post(login(db));
};
export default UsersRoutes;
