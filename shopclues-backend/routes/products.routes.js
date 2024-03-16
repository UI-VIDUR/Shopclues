const express =  require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.post('/create', productController.createProduct );
router.get('/?', productController.getAllProducts );

module.exports = router;
