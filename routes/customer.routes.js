const express = require("express");
const AuthController = require("../controllers/customer.controller");
const AccessTokenValidator = require("../middlewares/customervalidator.middlewares");
const router = express.Router();
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/profile", AccessTokenValidator, AuthController.getProfile);
module.exports = router;
