// modules
const express = require("express");
const productRouter = require('./routes/productRoutes')
const app = express();

// MIDDLEWARES
// Estos dos se usan en lugar de 'body-parser' que ya está deprecated
// Sólo actúan en POST y PUT requests. Son necesarios para capturar el body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/products', productRouter)

//export
module.exports = app;
