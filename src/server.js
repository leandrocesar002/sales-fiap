const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const vendaRoutes = require("./routes/vendaRoutes");
const pagamentoRoutes = require("./routes/pagamentoRoutes");
const webhookRoutes = require("./routes/pagamentosHookRoute"); 

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/vendas", vendaRoutes);
app.use("/pagamentos", pagamentoRoutes);
app.use(webhookRoutes); 

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

startServer();

module.exports = app;
