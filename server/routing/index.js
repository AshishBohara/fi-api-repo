import CustomerLoansRoutes from './routes/CustomerLoansRoutes';
import CustomersRoutes from './routes/CustomersRoutes';
import MasterInterestRateRoutes from './routes/MasterInterestRateRoutes';
import MasterLoanChargesRoutes from './routes/MasterLoanChargesRoutes';
import MasterPenaltiesRoutes from './routes/MasterPenaltiesRoutes';
import UsersRoutes from './routes/UsersRoutes';

const path = '/api/v1';

const routerSetup = (app, db) => {
  UsersRoutes(app, path, db);
  MasterInterestRateRoutes(app, path, db);
  MasterPenaltiesRoutes(app, path, db);
  MasterLoanChargesRoutes(app, path, db);
  CustomersRoutes(app, path, db);
  CustomerLoansRoutes(app, path, db);
  return;
};

export default routerSetup;
