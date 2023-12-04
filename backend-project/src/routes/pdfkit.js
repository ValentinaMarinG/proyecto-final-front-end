const express = require("express");
const pdfkitController = require("../controllers/pdfkit");
const middleware_authentication = require("../middlewares/authenticated");


const routes = express.Router();

routes.get("/", [middleware_authentication.ensureAuth], pdfkitController.getPDFReport);

module.exports = routes;