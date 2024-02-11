const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.controller");
const { validateCategoryBody , validateCategoryResults } = require("../middlewares/validateCategory");

router.post('/create',  validateCategoryBody() , validateCategoryResults ,  categoryController.createNewCategory );


module.exports = router;