const express = require('express');

// learn about how to pass registeruser inside brackets
const {registerUser, authUser, allUser} = require('../controller/userController')
const {protect} = require("../middleware/auth");
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUser);
router.post('/login',authUser);

module.exports = router;