const express = require("express");
const { cadastrarVenda } = require("../application/cadastrarVenda");
const { listarVendas } = require("../application/listarVendas");

const router = express.Router();

// Rota para cadastrar uma venda
router.post("/", async (req, res) => {
    try {
        const { veiculo_id, cpf_comprador, data_venda } = req.body;

        if (!veiculo_id || !cpf_comprador || !data_venda) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const venda = await cadastrarVenda(veiculo_id, cpf_comprador, data_venda);
        res.status(201).json(venda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para listar todas as vendas
router.get("/", async (req, res) => {
    try {
        const vendas = await listarVendas();
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
