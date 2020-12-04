const express = require("express");
const router = express.Router();

const {sayHi} = require('../controller/ctrl_user');

router.get('/', sayHi);

module.exports = router;