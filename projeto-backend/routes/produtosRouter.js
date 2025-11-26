const express = require('express');
const controller = require('../controllers/produtosController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/", controller.listarProdutos);

router.post("/", authMiddleware, controller.criarProduto);

router.get("/:id", controller.pesquisarId, controller.exibirProduto);

router.put("/:id", authMiddleware, controller.pesquisarId, controller.alterarProduto);

router.delete("/:id", authMiddleware, controller.pesquisarId, controller.apagarProduto);

module.exports = router;