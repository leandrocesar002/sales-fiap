const express = require("express");
const bodyParser = require("body-parser");
const Pagamento = require("../infrastructure/database/models/PagamentoModel");

const router = express.Router();
router.use(bodyParser.json());

router.post("/webhook/pagamento", async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ID do pagamento é obrigatório." });
        }

        const pagamento = await Pagamento.findByPk(id);

        if (!pagamento) {
            return res.status(404).json({ message: "Pagamento não encontrado." });
        }

        if (pagamento.status_pagamento === "APROVADO") {
            return res.status(200).json({ message: "O pagamento já foi aprovado." });
        }

        if (pagamento.status_pagamento === "CANCELADO") {
            return res.status(200).json({ message: "O pagamento já foi cancelado." });
        }

        const statusPagamentoExterno = Math.random() > 0.5 ? "APROVADO" : "CANCELADO"; 

        pagamento.status_pagamento = statusPagamentoExterno;
        await pagamento.save();

        console.log(`✅ Pagamento ${id} atualizado para ${statusPagamentoExterno}`);
        return res.status(200).json({
            message: `Status do pagamento atualizado para ${statusPagamentoExterno}.`,
            status_pagamento: statusPagamentoExterno
        });

    } catch (error) {
        console.error("❌ Erro ao processar webhook:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
});

module.exports = router;
