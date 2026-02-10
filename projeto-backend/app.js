require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const produtosRouter = require('./routes/produtosRouter');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();
app.use(express.json());

// Conectar ao MongoDB
const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PSSWD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;

mongoose
  .connect(url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar com MongoDB", err.message));


// Rotas
app.use('/produtos', produtosRouter);
app.use('/api-docs', apidocsRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
