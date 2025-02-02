const Pagamento = require("../infrastructure/database/models/PagamentoModel");

const listarPagamentos = async () => {
    try {
        const pagamentos = await Pagamento.findAll();
        return pagamentos;
    } catch (error) {
        throw new Error(`Erro ao listar pagamentos: ${error.message}`);
    }
};

module.exports = { listarPagamentos };
