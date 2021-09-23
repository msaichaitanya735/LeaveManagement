const express = require ('express');
const router = express.Router();
// const { protect } = require('../middleware/auth')


const {register, forgotpassword, login, resetpassword, lastlogin} = require('../controllers/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgotpassword)

router.route('/resetpassword/:resetToken').put(resetpassword)

// router.route('/lastlogin').put(lastlogin)
module.exports = router;