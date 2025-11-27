const express = require('express');
const controller = require('../controllers/produtosController');
const {verificarToken} = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/", controller.listarProdutos);

router.post("/", verificarToken, controller.criarProduto);

router.get("/:id", controller.pesquisarId, controller.exibirProduto);

router.put("/:id", verificarToken, controller.pesquisarId, controller.alterarProduto);

router.delete("/:id", verificarToken, controller.pesquisarId, controller.apagarProduto);

module.exports = router;