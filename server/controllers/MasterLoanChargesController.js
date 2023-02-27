export const create = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const recordExist = await db.MasterLoanCharge.count({
      where: {
        chargesName: reqBody.chargesName,
      },
    });
    if (recordExist > 0) {
      return res.alredyExist({
        message: 'Record already exist.',
      });
    }
    const loanCharges = await db.MasterLoanCharge.create({
      chargesName: reqBody.chargesName,
      amount: reqBody.amount,
      isDeleted: false,
    });
    if (loanCharges) {
      return res.ok({
        message: 'Success',
        data: loanCharges,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const list = (db) => async (req, res, next) => {
  try {
    const loanCharges = await db.MasterLoanCharge.findAll();
    if (loanCharges) {
      return res.ok({
        message: 'Success',
        data: loanCharges,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const view = (db) => async (req, res, next) => {
  const reqQuery = req.query;

  try {
    const loanCharges = await db.MasterLoanCharge.findOne({
      where: {
        id: reqQuery.loan_charges_id,
      },
    });
    if (loanCharges) {
      return res.ok({
        message: 'Success',
        data: loanCharges,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const update = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const loanCharges = await db.MasterLoanCharge.findOne({
      where: {
        id: reqBody.loan_charges_id,
      },
    });
    await loanCharges.update({
      chargesName: reqBody.chargesName,
      amount: reqBody.amount,
      isDeleted: reqBody.isDeleted,
    });
    if (loanCharges) {
      return res.ok({
        message: 'Success',
        data: loanCharges,
      });
    }
  } catch (e) {
    next(e);
  }
};
