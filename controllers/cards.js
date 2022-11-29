let Carddetails = require('../models/carddetails.model');
const User = require('../models/user.model');
const {Sentry,transaction}=require('../express/sentry')
exports.getCarddetails = (req, res) => {
  Carddetails.find( {
        $and: [
          { $and: [ { customerName: { $ne: '' } }, { customerName: { $ne: null }} ]} ,
          { $and: [ { accountNumber: { $ne: '' } }, { accountNumber: { $ne: null }} ]} ,
          { $and: [ { aadharNumber: { $ne: '' } }, { aadharNumber: { $ne: null }} ]} ,
          { $and: [ { panNumber: { $ne: '' } }, { panNumber: { $ne: null }} ]} ,
          { $and: [ { creditScore: { $ne: '' } }, { creditScore: { $ne: null }} ]} ,
          { $and: [ { accountType: { $ne: '' } }, { accountType: { $ne: null }} ]} ,
          { $and: [ { creditScore: { $ne: '' } }, { creditScore: { $ne: null }} ]} ,
          { $and: [ { annualAvgIncome: { $ne: '' } }, { annualAvgIncome: { $ne: null }} ]} ,
        ]
     })
    .then((cards) => res.json(cards))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
};

exports.addCarddetails = async (req, res) => {
    const newCarddetails = new Carddetails({
      customerId:req.user._id,
      customerName: req.body.namec,
      accountNumber: Number(req.body.accountnumber),
      aadharNumber: Number(req.body.aadhar),
      panNumber:req.body.pan,
      creditScore:Number(req.body.creditscore),
      annualAvgIncome:Number(req.body.annualavgincome),
      incomeSource:req.body.incomesource,
      accountType:req.body.accounttype
    });
    newCarddetails
      .save()
    .then(() => res.json("Card details added!"))
    .catch((err) => {
          res.status(400).json('Error: ' + err)
          Sentry.captureException(err);
        }).finally(()=>transaction.finish());
}