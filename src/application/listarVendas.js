const Venda = require("../infrastructure/database/models/VendaModel");

const listarVendas = async () => {
    try {
        const vendas = await Venda.findAll();
        return vendas;
    } catch (error) {
        throw new Error(`Erro ao listar vendas: ${error.message}`);
    }
};

module.exports = { listarVendas };
