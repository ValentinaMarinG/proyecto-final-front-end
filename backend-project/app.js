const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();
app.use(bodyParser.json());

/* Rutas */
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/userRoutes");
const pqrsfRoutes = require("./src/routes/pqrsf");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const pdfkitRoutes = require("./src/routes/pdfkit");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/help`, pqrsfRoutes);
app.use(`/api/${API_VERSION}/categories`, categoryRoutes);
app.use(`/api/${API_VERSION}/products`, productRoutes);
app.use(`/api/${API_VERSION}/invoice`, pdfkitRoutes);

module.exports = app;