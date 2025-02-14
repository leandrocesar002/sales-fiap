const axios = require("axios");

const VEICULO_SERVICE_URL = "http://52.91.28.63:3000/api/veiculos"; 

const buscarVeiculoPorId = async (id) => {
    try {
        const response = await axios.get(`${VEICULO_SERVICE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar veículo:", error.message);
        return null; 
    }
};

module.exports = {
    buscarVeiculoPorId,
};
