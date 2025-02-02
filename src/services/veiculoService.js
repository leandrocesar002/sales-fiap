const axios = require("axios");

const VEICULO_SERVICE_URL = "http://localhost:3000/api/veiculos"; // Altere a URL se necessário

const buscarVeiculoPorId = async (id) => {
    try {
        const response = await axios.get(`${VEICULO_SERVICE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar veículo:", error.message);
        return null; // Retorna null caso o veículo não seja encontrado
    }
};

module.exports = {
    buscarVeiculoPorId,
};
