import jwtVerify from '../middleware/jwt.verify';
import CustomerLoansRoutes from './routes/CustomerLoansRoutes';
import CustomersRoutes from './routes/CustomersRoutes';
import MasterInterestRateRoutes from './routes/MasterInterestRateRoutes';
import MasterLoanChargesRoutes from './routes/MasterLoanChargesRoutes';
import MasterPenaltiesRoutes from './routes/MasterPenaltiesRoutes';
import UsersRoutes from './routes/UsersRoutes';

const path = '/api/v1';

const routerSetup = (app, db) => {
  UsersRoutes(app, path, db, jwtVerify.verifyToken);
  MasterInterestRateRoutes(app, path, db, jwtVerify.verifyToken);
  MasterPenaltiesRoutes(app, path, db, jwtVerify.verifyToken);
  MasterLoanChargesRoutes(app, path, db, jwtVerify.verifyToken);
  CustomersRoutes(app, path, db, jwtVerify.verifyToken);
  CustomerLoansRoutes(app, path, db, jwtVerify.verifyToken);
  return;
};

export default routerSetup;
