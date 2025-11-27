const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: [true, "Nome do produto é obrigatório"], 
        minLength: [3,"Nome do produto deve ter pelo menos 3 caracteres"],
        unique: true,
        trim: true
    },
    valor: { 
        type: Number, 
        required: [true, "Valor do produto é obrigatório"],
        min: [0, "O valor não pode ser negativo"]
    },
    esgotado: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);
