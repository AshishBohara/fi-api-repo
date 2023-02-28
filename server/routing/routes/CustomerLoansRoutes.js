import { addLoan, list, installmemtList } from '../../controllers/CustomerLoansController';

const CustomerLoansRoutes = (app, path, db) => {
  app.route(`${path}/customer-loan/add`).post(addLoan(db));
  app.route(`${path}/customer-loan/list`).get(list(db));
  app.route(`${path}/customer-loan/installment-list`).get(installmemtList(db));
};
export default CustomerLoansRoutes;
