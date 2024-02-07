const express = require("express");
const router = express.Router();

const { registerController , loginController } = require("../controllers/auth.controllers");
const { validateForm , validateErrors } = require("../middlewares/registerValidation");

router.post('/register', validateForm(), validateErrors,  registerController );
router.post('/login', loginController );

module.exports = router;