const express = require("express");
const router = express.Router();

const { signup } = require("../controller/ctrl_user");

router.post("/signup", sayHi);

module.exports = router;
