const admin = require("../config/firebase-config");
const User = require('../models/user.model');
const {Sentry,transaction}=require('../express/sentry')
const requireSignin = async (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        const user = await User.find({ email: decodeValue.email });
        req.user = user[0];
        return next();
      }
      return res.status(401).json({ message: "Authorization required" });
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).json(err)
    }finally{
      transaction.finish()
    };
  } else {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};

module.exports = requireSignin;
