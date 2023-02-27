export const create = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;

    const interestRateExist = await db.MasterInterestRate.count();
    if (interestRateExist > 0) {
      return res.alredyExist({
        message: 'Interest Rate already exist.',
      });
    }
    const interestRate = await db.MasterInterestRate.create({
      interestRate: reqBody.interestRate,
    });
    if (interestRate) {
      return res.ok({
        message: 'Success',
        data: interestRate,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const list = (db) => async (req, res, next) => {
  try {
    const interestRate = await db.MasterInterestRate.findAll();
    if (interestRate) {
      return res.ok({
        message: 'Success',
        data: interestRate,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const view = (db) => async (req, res, next) => {
  const reqQuery = req.query;

  try {
    const interestRate = await db.MasterInterestRate.findOne({
      where: {
        id: reqQuery.interest_rate_id,
      },
    });
    if (interestRate) {
      return res.ok({
        message: 'Success',
        data: interestRate,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const update = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const interestRate = await db.MasterInterestRate.findOne({
      where: {
        id: reqBody.interest_rate_id,
      },
    });
    await interestRate.update({
      interestRate: reqBody.interestRate,
    });
    if (interestRate) {
      return res.ok({
        message: 'Success',
        data: interestRate,
      });
    }
  } catch (e) {
    next(e);
  }
};
