const express = require("express");
const router = express.Router();

const { registerController , loginController } = require("../controllers/auth.controllers");
const { validateForm , validateErrors } = require("../middlewares/registerValidation");
const { loginValidator , loginValidateErrors  } = require("../middlewares/loginValidation");

router.post('/register', validateForm(), validateErrors,  registerController );
router.post('/login', loginValidator() ,  loginValidateErrors , loginController );


module.exports = router;