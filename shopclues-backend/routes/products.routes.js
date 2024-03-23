const express =  require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.post('/create', productController.createProduct );
router.get('/?', productController.getAllProducts );
router.get('/category/:catid?', productController.getAllProductsByCat );


module.exports = router;
