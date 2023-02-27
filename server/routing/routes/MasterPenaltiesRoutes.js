import { create, list, view, update } from '../../controllers/MasterPenaltiesController';

const MasterPenaltiesRoutes = (app, path, db) => {
  app.route(`${path}/penalty/create`).post(create(db));
  app.route(`${path}/penalty/list`).get(list(db));
  app.route(`${path}/penalty/view`).get(view(db));
  app.route(`${path}/penalty/update`).put(update(db));
};
export default MasterPenaltiesRoutes;
