require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouter');
const apidocsRouter = require('./routes/apidocsRouter');

const app = express();
app.use(express.json());

// Conectar ao MongoDB
const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PSSWD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;

mongoose
  .connect(url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar com mongoDB", err.message));
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('Erro ao conectar MongoDB:', err.message);
    process.exit(1);
  });

// Rotas
app.use('/produtos', produtosRouter);
app.use('/api-docs', apidocsRouter);

// Tratamento de erros simples
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ msg: err.message || 'Erro interno' });
});

module.exports = app;
