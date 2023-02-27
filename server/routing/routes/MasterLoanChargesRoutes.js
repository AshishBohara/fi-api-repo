import { create, list, view, update } from '../../controllers/MasterLoanChargesController';

const MasterLoanChargesRoutes = (app, path, db) => {
  app.route(`${path}/loan-charges/create`).post(create(db));
  app.route(`${path}/loan-charges/list`).get(list(db));
  app.route(`${path}/loan-charges/view`).get(view(db));
  app.route(`${path}/loan-charges/update`).put(update(db));
};
export default MasterLoanChargesRoutes;
