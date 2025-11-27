const Produto = require('../models/produtosModel');

const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao listar produtos', erro: error.message });
  }
};

const criarProduto = async (req, res) => {
  try {
    const { nome, valor, esgotado } = req.body;

    if (!nome || valor == null) {
      return res.status(400).json({ msg: 'Nome e preço são obrigatórios' });
    }

    if (valor < 0) {
      return res.status(400).json({ msg: 'Preço inválido' });
    }

    const novoProduto = new Produto({
      nome,
      valor,
      esgotado
    });

    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao criar produto', erro: error.message });
  }
};

const pesquisarId = async (req, res, next) => {
  let produto;

  try {
    produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ msg: 'ID inválido' });
  }

  res.produto = produto;
  next();
};

const exibirProduto = (req, res) => {
  res.status(200).json(res.produto);
};

const alterarProduto = async (req, res) => {
  try {
    const { nome, valor, esgotado } = req.body;

    if (valor !== undefined && valor < 0) {
      return res.status(400).json({ msg: 'Preço inválido' });
    }

    if (nome !== undefined) res.produto.nome = nome;
    if (valor !== undefined) res.produto.valor = valor;
    if (esgotado !== undefined) res.produto.esgotado = esgotado;

    const produtoAtualizado = await res.produto.save();
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao atualizar produto', erro: error.message });
  }
};

const apagarProduto = async (req, res) => {
  try {
    await res.produto.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao apagar produto', erro: error.message });
  }
};

module.exports = {
  listarProdutos,
  criarProduto,
  pesquisarId,
  exibirProduto,
  alterarProduto,
  apagarProduto
};