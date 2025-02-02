const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const vendaRoutes = require("./routes/vendaRoutes");
const pagamentoRoutes = require("./routes/pagamentoRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use("/vendas", vendaRoutes);
app.use("/pagamentos", pagamentoRoutes);

const PORT = 4000;

sequelize.sync()
    .then(() => {
        console.log("📦 Banco de dados sincronizado com sucesso!");
        app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    })
    .catch(err => console.error("❌ Erro ao conectar ao banco de dados:", err));
