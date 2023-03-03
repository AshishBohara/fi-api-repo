import { addLoan, list, installmemtList, installmemtPayment } from '../../controllers/CustomerLoansController';

const CustomerLoansRoutes = (app, path, db, verifyToken) => {
  app.route(`${path}/customer-loan/add`).post(verifyToken, addLoan(db));
  app.route(`${path}/customer-loan/list`).get(verifyToken, list(db));
  app.route(`${path}/customer-loan/installment-list`).get(verifyToken, installmemtList(db));
  app.route(`${path}/customer-loan/installment-payment`).put(verifyToken, installmemtPayment(db));
};
export default CustomerLoansRoutes;
