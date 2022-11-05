let User = require('../models/user.model');
const {Sentry,transaction}=require('../express/sentry');
const Carddetails = require('../models/carddetails.model');

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
};
exports.getVerifiedUsers = async (req, res) => {

  User.find( {
      $and: [{isVerified:false},{role:'user'},
        { $and: [ { address: { $ne: '' } }, { address: { $ne: null }} ]} ,
        { $and: [ { city: { $ne: '' } }, { city: { $ne: null }} ]} ,
        { $and: [ { state: { $ne: '' } }, { state: { $ne: null }} ]} ,
        { $and: [ { zipCode: { $ne: '' } }, { zipCode: { $ne: null }} ]} ,
        { $and: [ { country: { $ne: '' } }, { country: { $ne: null }} ]} ,
        { $and: [ { mobileNumber: { $ne: '' } }, { mobileNumber: { $ne: null }} ]} ,

      ]
   })
    .then((users) => res.json(users))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());

};

exports.getUserById = (req, res) => {

  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
}

exports.getUserByEmail = (req, res) => {

  User.findOne({email:req.params.email})
    .then((user) => res.json(user))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
}
exports.addUser = async (req, res) => {
  console.log('add user function',req.body)
  const userExist = await User.findOne({ email: req.body.email });
  if(!userExist) {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role:req.body.role,
      isVerified:false,
    });
    newUser
      .save()
    .then(() => res.json("User added!"))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
  }
  else {
    res.status(400).json("Error: User already Exists")
  }
}

exports.updateUserByEmail = async (req, res) => {
  try {
    try {
      console.log( 'updateUserByEmail',req.headers.user);
    } catch (err){
      console.log("user object not ");
      Sentry.captureException(err);
    }finally{
    transaction.finish()
    }
    await User.updateOne({ email: req.body.email }, {
      $set: {
        email:req.body.newemail,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        zipCode:req.body.zipCode,
        country:req.body.country,
        mobileNumber:req.body.mobile,
      }
    })
    res.status(200).json('Message: User Updated')
  } catch (err) {
    Sentry.captureException(err);
    res.status(400).json("Error: " + err)
  }finally{
    transaction.finish()
  }
}

exports.verifyUser = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      (user.isVerified = true),
        user
          .save()
          .then(() => res.json('User Verified!'))
          .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
    })
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
};