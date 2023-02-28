import { addLoan } from '../../controllers/CustomerLoansController';

const CustomerLoansRoutes = (app, path, db) => {
  app.route(`${path}/customer-loan/add`).post(addLoan(db));
};
export default CustomerLoansRoutes;
