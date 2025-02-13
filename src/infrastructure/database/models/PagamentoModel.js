const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");
const Venda = require("./VendaModel");

const Pagamento = sequelize.define("Pagamento", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    venda_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Venda,
            key: "id",
        },
    },
    codigo_pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status_pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Venda.hasOne(Pagamento, { foreignKey: "venda_id" });
Pagamento.belongsTo(Venda, { foreignKey: "venda_id" });

module.exports = Pagamento;
