// modules
const express = require("express");
const productControllers = require("../controllers/productControllers");

const router = express.Router(); //metodo para crear rutas
//routes
router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(productControllers.createProduct);

router
  .route("/:id")
  .get(productControllers.getProduct)
  .patch(productControllers.updateProduct)
  .delete(productControllers.deleteProduct);

//exportar router

module.exports = router;
