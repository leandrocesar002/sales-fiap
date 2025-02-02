const Pagamento = require("../infrastructure/database/models/PagamentoModel");

const cadastrarPagamento = async (venda_id, codigo_pagamento, status_pagamento) => {
    try {
        if (!venda_id || !codigo_pagamento || !status_pagamento) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        const pagamento = await Pagamento.create({
            venda_id,
            codigo_pagamento,
            status_pagamento,
        });

        return pagamento;
    } catch (error) {
        throw new Error(`Erro ao cadastrar pagamento: ${error.message}`);
    }
};

module.exports = { cadastrarPagamento };
