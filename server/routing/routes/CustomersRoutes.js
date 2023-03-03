import { create, list, view, update } from '../../controllers/CustomersController';
const CustomersRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/customer/create`).post(verifyToken, create(db));
  app.route(`${path}/customer/list`).get(verifyToken, list(db));
  app.route(`${path}/customer/view`).get(verifyToken, view(db));
  app.route(`${path}/customer/update`).put(verifyToken, update(db));
};
export default CustomersRoutes;
