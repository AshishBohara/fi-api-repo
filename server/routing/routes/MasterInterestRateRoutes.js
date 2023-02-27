import { create, list, view, update } from '../../controllers/MasterInterestRatesController';

const MasterInterestRateRoutes = (app, path, db) => {
  app.route(`${path}/interest-rate/create`).post(create(db));
  app.route(`${path}/interest-rate/list`).get(list(db));
  app.route(`${path}/interest-rate/view`).get(view(db));
  app.route(`${path}/interest-rate/update`).put(update(db));
};
export default MasterInterestRateRoutes;
