const express = require("express");
const { cadastrarPagamento } = require("../application/cadastrarPagamento");
const { listarPagamentos } = require("../application/listarPagamentos");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { venda_id, codigo_pagamento, status_pagamento } = req.body;

        if (!venda_id || !codigo_pagamento || !status_pagamento) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }

        const pagamento = await cadastrarPagamento(venda_id, codigo_pagamento, status_pagamento);
        res.status(201).json(pagamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const pagamentos = await listarPagamentos();
        res.status(200).json(pagamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
