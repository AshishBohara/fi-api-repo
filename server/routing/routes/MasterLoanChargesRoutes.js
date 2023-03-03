import { create, list, view, update } from '../../controllers/MasterLoanChargesController';

const MasterLoanChargesRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/loan-charges/create`).post(verifyToken, create(db));
  app.route(`${path}/loan-charges/list`).get(verifyToken, list(db));
  app.route(`${path}/loan-charges/view`).get(verifyToken, view(db));
  app.route(`${path}/loan-charges/update`).put(verifyToken, update(db));
};
export default MasterLoanChargesRoutes;
