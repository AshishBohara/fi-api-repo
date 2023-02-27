import md5 from 'md5';
export const login = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;
    const user = await db.User.findOne({
      where: { mobileNumber: reqBody.mobileNumber, password: md5(reqBody.password) },
    });
    if (user) {
      return res.ok({
        message: 'Success',
        data: user,
      });
    } else {
      return res.error({
        message: 'Failed',
        data: user,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const create = (db) => async (req, res, next) => {
  try {
    const reqBody = req.body;

    const userExist = await db.User.count({
      where: { mobileNumber: reqBody.mobileNumber },
    });
    if (userExist > 0) {
      return res.alredyExist({
        message: 'User already exist.',
      });
    }
    const user = await db.User.create({
      mobileNumber: reqBody.mobileNumber,
      password: md5(reqBody.password),
      name: reqBody.name,
    });
    if (user) {
      return res.ok({
        message: 'Success',
        data: user,
      });
    }
  } catch (e) {
    next(e);
  }
};