  const express = require("express");
  const multiparty = require("connect-multiparty");
  const UserController = require("../controllers/user");
  const middleware_authentication = require("../middlewares/authenticated");

  const api = express.Router();

  /* Sólo los usuarios registrados pueden acceder a las rutas */
  api.get("/me", [middleware_authentication.ensureAuth], UserController.getMe);
  api.get("/", [middleware_authentication.ensureAuth], UserController.getUsers);
  api.get("/:id", [middleware_authentication.ensureAuth], UserController.getUser);
  api.post("/user", UserController.createUser);
  api.post("/email", UserController.resetPasswordEmail);
  api.post("/reset", [middleware_authentication.ensureAuth], UserController.resetPassword);
  api.post("/user/change-password", [middleware_authentication.ensureAuth], UserController.changePassword);
  api.patch("/:id", [middleware_authentication.ensureAuth], UserController.updateUser);
  api.patch("/admin/change-active", [middleware_authentication.ensureAuth], UserController.changeActiveUser);
  api.delete("/:id", [middleware_authentication.ensureAuth], UserController.deleteUser);

  module.exports = api;