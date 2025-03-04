const express = require("express");
const AuthController = require("../controllers/customer.controller");
const router = express.Router();
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);
module.exports = router;
