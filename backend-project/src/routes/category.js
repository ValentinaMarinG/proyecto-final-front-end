const express = require("express");
const categoryController = require("../controllers/category");
const middleware_authentication = require("../middlewares/authenticated");

const routes = express.Router();

routes.post("/",[middleware_authentication.ensureAuth], categoryController.createCategory);
routes.get("/",[middleware_authentication.ensureAuth], categoryController.listCategories);
routes.get("/:categoryId",[middleware_authentication.ensureAuth], categoryController.listCategory);
routes.patch("/:categoryId",[middleware_authentication.ensureAuth], categoryController.editCategory);
routes.delete("/:categoryId",[middleware_authentication.ensureAuth], categoryController.deleteCategory);

module.exports = routes;