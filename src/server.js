const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const vendaRoutes = require("./routes/vendaRoutes");
const pagamentoRoutes = require("./routes/pagamentoRoutes");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use("/vendas", vendaRoutes);
app.use("/pagamentos", pagamentoRoutes);

// Função para iniciar o servidor
const startServer = async () => {
    try {
        await sequelize.sync();
        console.log("📦 Banco de dados sincronizado com sucesso!");

        const PORT = 4000;
        app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
    }
};

// Inicia o servidor
startServer();

module.exports = app;
