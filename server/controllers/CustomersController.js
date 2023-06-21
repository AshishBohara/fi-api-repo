import { Op, Sequelize } from 'sequelize';

export const create = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const recordExist = await db.Customer.count({
      where: {
        mobileNumber: reqBody.mobileNumber,
      },
    });
    if (recordExist > 0) {
      return res.alredyExist({
        message: 'Customer already exist.',
      });
    }
    const loanCharges = await db.Customer.create({
      mobileNumber: reqBody.mobileNumber,
      name: reqBody.name,
      fatherName: reqBody.fatherName,
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
    let limit = +req.query.page_size;
    let search_contain = req.query.search_contain;
    let offset = 0 + (req.query.page_no - 1) * limit;

    const records = await db.Customer.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search_contain}%` } },
          { mobileNumber: { [Op.like]: `%${search_contain}%` } },
        ],
      },
      offset: offset,
      limit: limit,
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

export const view = (db) => async (req, res, next) => {
  const reqQuery = req.query;

  try {
    const record = await db.Customer.findOne({
      where: {
        id: reqQuery.id,
      },
    });
    if (record) {
      return res.ok({
        message: 'Success',
        data: record,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const update = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const record = await db.Customer.findOne({
      where: {
        id: reqBody.id,
      },
    });
    await record.update({
      mobileNumber: reqBody.mobileNumber,
      name: reqBody.name,
      fatherName: reqBody.fatherName,
    });
    if (record) {
      return res.ok({
        message: 'Success',
        data: record,
      });
    }
  } catch (e) {
    next(e);
  }
};
