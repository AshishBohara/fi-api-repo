import { create, list, view, update } from '../../controllers/MasterInterestRatesController';

const MasterInterestRateRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/interest-rate/create`).post(verifyToken, create(db));
  app.route(`${path}/interest-rate/list`).get(verifyToken, list(db));
  app.route(`${path}/interest-rate/view`).get(verifyToken, view(db));
  app.route(`${path}/interest-rate/update`).put(verifyToken, update(db));
};
export default MasterInterestRateRoutes;
