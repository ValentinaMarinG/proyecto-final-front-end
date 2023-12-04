const express = require("express");
const multiparty = require("connect-multiparty");
const PQRSFController = require("../controllers/pqrsf")

const api = express.Router();

api.post("/pqrsf", PQRSFController.sendPQRSF);

module.exports = api;
