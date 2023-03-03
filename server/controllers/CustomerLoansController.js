import moment from 'moment';

export const addLoan = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const loanCharges = await db.CustomerLoan.create({
      interestRate: reqBody.interestRate,
      loanAmount: reqBody.loanAmount,
      loanDate: moment(reqBody.loanDate).format('YYYY-MM-DD'),
      noOfInstallment: reqBody.noOfInstallment,
      penaltyAmount: reqBody.penaltyAmount,
      totalLoanCharges: reqBody.totalLoanCharges,
      customerId: reqBody.customerId,
      loanCompleted: false,
    });
    let customerLoanId = loanCharges.id;
    let loanChargesRecords = [];
    Object.keys(reqBody.loanCharges).forEach(function (key) {
      loanChargesRecords.push({
        customerId: reqBody.customerId,
        customerLoanId: customerLoanId,
        chargesName: key,
        amount: reqBody.loanCharges[key],
      });
    });
    console.log(loanChargesRecords);
    await db.CustomerLoanCharge.bulkCreate(loanChargesRecords, { logging: true });

    let loanInstallmentRecords = [];
    let amount = Math.round(reqBody.loanAmount / reqBody.noOfInstallment);
    let loanAmountInterest = Math.round(((reqBody.loanAmount * reqBody.interestRate) / 100) * reqBody.noOfInstallment);
    let installmentAmount = Math.round((reqBody.loanAmount + loanAmountInterest) / reqBody.noOfInstallment);
    for (let i = 0; i < reqBody.noOfInstallment; i++) {
      loanInstallmentRecords.push({
        customerId: reqBody.customerId,
        customerLoanId: customerLoanId,
        amount: amount,
        installmentAmount: installmentAmount,
        installmentDate: moment(reqBody.loanDate)
          .add(i + 1, 'M')
          .format('YYYY-MM-DD'),
        installmentCompleted: false,
      });
    }

    const customerLoanInstallment = await db.CustomerLoanInstallment.bulkCreate(loanInstallmentRecords);

    if (customerLoanInstallment) {
      return res.ok({
        message: 'Success',
        data: '',
      });
    }
  } catch (e) {
    next(e);
  }
};

export const list = (db) => async (req, res, next) => {
  try {
    const reqQuery = req.query;
    const customerId = reqQuery.customerId;
    const records = await db.CustomerLoan.findAll({
      where: { customerId: customerId },
      include: { model: db.Customer, attributes: ['name', 'mobileNumber'] },
    });
    if (records) {
      return res.ok({
        message: 'Success',
        data: records,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const installmemtList = (db) => async (req, res, next) => {
  try {
    const reqQuery = req.query;
    const customerId = reqQuery.customerId;
    const customerLoanId = reqQuery.customerLoanId;
    const records = await db.CustomerLoanInstallment.findAll({
      where: { customerId: customerId, customerLoanId: customerLoanId },
      include: [
        { model: db.Customer, attributes: ['name', 'mobileNumber'] },
        { model: db.CustomerLoan, attributes: ['penaltyAmount'] },
      ],
    });
    if (records) {
      return res.ok({
        message: 'Success',
        data: records,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const installmemtPayment = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const record = await db.CustomerLoanInstallment.findOne({
      where: {
        id: reqBody.id,
        customerId: reqBody.customerId,
        customerLoanId: reqBody.customerLoanId,
      },
    });
    await record.update({
      penaltyAmount: reqBody.penaltyAmount,
      totalAmount: reqBody.totalAmount,
      installmentCompleted: true,
      paymentReceivedDate: moment().format('YYYY-MM-DD'),
    });
    return res.ok({
      message: 'Success',
      data: record,
    });
  } catch (e) {
    next(e);
  }
};
