
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.controller");
const { validateCategoryBody , validateCategoryResults } = require("../middlewares/validateCategory");

router.post('/create',  validateCategoryBody() , validateCategoryResults ,  categoryController.createNewCategory );
router.get('/?',  categoryController.getAllCategories );
router.get('/:catid',  categoryController.getCategoryById );


module.exports = router;