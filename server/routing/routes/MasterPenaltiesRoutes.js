import { create, list, view, update } from '../../controllers/MasterPenaltiesController';

const MasterPenaltiesRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/penalty/create`).post(verifyToken, create(db));
  app.route(`${path}/penalty/list`).get(verifyToken, list(db));
  app.route(`${path}/penalty/view`).get(verifyToken, view(db));
  app.route(`${path}/penalty/update`).put(verifyToken, update(db));
};
export default MasterPenaltiesRoutes;
