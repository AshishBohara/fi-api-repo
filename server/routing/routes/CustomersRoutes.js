import { create, list, view, update } from '../../controllers/CustomersController';

const CustomersRoutes = (app, path, db) => {
  app.route(`${path}/customer/create`).post(create(db));
  app.route(`${path}/customer/list`).get(list(db));
  app.route(`${path}/customer/view`).get(view(db));
  app.route(`${path}/customer/update`).put(update(db));
};
export default CustomersRoutes;
