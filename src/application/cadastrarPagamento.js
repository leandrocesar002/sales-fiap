const Pagamento = require("../infrastructure/database/models/PagamentoModel");
const axios = require("axios");

const VENDAS_SERVICE_URL = "http://localhost:4000/vendas";
const VEICULO_SERVICE_URL = "http://54.211.144.92:3000/api/veiculos";

const cadastrarPagamento = async (venda_id, codigo_pagamento, status_pagamento) => {
    try {
        if (!venda_id || !codigo_pagamento || !status_pagamento) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        // Cadastra o pagamento no banco
        const pagamento = await Pagamento.create({
            venda_id,
            codigo_pagamento,
            status_pagamento,
        });

        // Se o pagamento for aprovado, busca o veiculo_id da venda antes de atualizar o veículo
        if (status_pagamento.toUpperCase() === "APROVADO") {
            try {
                console.log("🔍 Buscando todas as vendas...");
                const vendaResponse = await axios.get(`${VENDAS_SERVICE_URL}`);
                console.log("📦 Lista de vendas recebida:", vendaResponse.data);

                // Filtra a venda correta pelo ID
                const vendaEncontrada = vendaResponse.data.find(venda => venda.id === venda_id);

                if (!vendaEncontrada) {
                    console.warn(`⚠️ Venda ${venda_id} não encontrada na lista de vendas.`);
                    return pagamento;
                }

                const veiculo_id = vendaEncontrada.veiculo_id;

                if (!veiculo_id) {
                    console.warn(`⚠️ Venda ${venda_id} não possui um veiculo_id associado.`);
                    return pagamento;
                }

                // Atualiza o status do veículo para "VENDIDO"
                await axios.put(`${VEICULO_SERVICE_URL}/${veiculo_id}`, { status: "VENDIDO" });
                console.log(`✅ Veículo ${veiculo_id} atualizado para VENDIDO.`);

            } catch (error) {
                console.error(`❌ Erro ao buscar venda ${venda_id} ou atualizar veículo:`, error.message);
            }
        }

        return pagamento;
    } catch (error) {
        throw new Error(`Erro ao cadastrar pagamento: ${error.message}`);
    }
};

module.exports = { cadastrarPagamento };
