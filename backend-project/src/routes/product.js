const express = require("express");
const productController = require("../controllers/product");
const middleware_authentication = require("../middlewares/authenticated");


const routes = express.Router();

routes.post("/", [middleware_authentication.ensureAuth], productController.createProduct);
routes.get("/", productController.listProducts);
routes.get("/:productId", [middleware_authentication.ensureAuth], productController.listProduct);
routes.patch("/:productId", [middleware_authentication.ensureAuth], productController.editProduct);
routes.delete("/:productId", [middleware_authentication.ensureAuth], productController.deleteProduct);

module.exports = routes;