const router = require("express").Router();
const { getUsers,getVerifiedUsers,addUser,getUserById,getUserByEmail, updateUserByEmail,verifyUser } = require('../controllers/users');
let requireSignin = require("../middleware");


router.get("/",getUsers);

router.get("/unverified",requireSignin,getVerifiedUsers);

router.get("/:email",requireSignin,getUserByEmail);

router.get('/:id',requireSignin,getUserById);

router.post("/add",requireSignin,addUser);

router.post("/update",requireSignin,updateUserByEmail);

router.post('/verify/:id',requireSignin,verifyUser);

module.exports = router;
