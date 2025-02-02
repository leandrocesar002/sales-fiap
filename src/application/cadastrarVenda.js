const Venda = require("../infrastructure/database/models/VendaModel");
const { buscarVeiculoPorId } = require("../services/veiculoService");

const cadastrarVenda = async (veiculo_id, cpf_comprador, data_venda) => {
    try {
        if (!veiculo_id || !cpf_comprador || !data_venda) {
            throw new Error("Todos os campos são obrigatórios!");
        }

        // Verifica se o veículo existe no serviço de veículos
        const veiculo = await buscarVeiculoPorId(veiculo_id);
        if (!veiculo) {
            throw new Error("Veículo não encontrado no serviço externo.");
        }

        // Criação da venda
        const venda = await Venda.create({
            veiculo_id,
            cpf_comprador,
            data_venda,
        });

        return venda;
    } catch (error) {
        throw new Error(`Erro ao cadastrar venda: ${error.message}`);
    }
};

module.exports = { cadastrarVenda };
