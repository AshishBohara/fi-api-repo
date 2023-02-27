export const create = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const recordExist = await db.MasterPenalty.count();
    if (recordExist > 0) {
      return res.alredyExist({
        message: 'Penalty amount already exist.',
      });
    }
    const penalty = await db.MasterPenalty.create({
      amount: reqBody.amount,
    });
    if (penalty) {
      return res.ok({
        message: 'Success',
        data: penalty,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const list = (db) => async (req, res, next) => {
  try {
    const penalty = await db.MasterPenalty.findAll();
    if (penalty) {
      return res.ok({
        message: 'Success',
        data: penalty,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const view = (db) => async (req, res, next) => {
  const reqQuery = req.query;

  try {
    const penalty = await db.MasterPenalty.findOne({
      where: {
        id: reqQuery.penalty_id,
      },
    });
    if (penalty) {
      return res.ok({
        message: 'Success',
        data: penalty,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const update = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const penalty = await db.MasterPenalty.findOne({
      where: {
        id: reqBody.penalty_id,
      },
    });
    await penalty.update({
      amount: reqBody.amount,
    });
    if (penalty) {
      return res.ok({
        message: 'Success',
        data: penalty,
      });
    }
  } catch (e) {
    next(e);
  }
};
