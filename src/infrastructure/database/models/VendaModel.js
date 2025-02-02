const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/database");

const Venda = sequelize.define("Venda", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    veiculo_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    cpf_comprador: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    data_venda: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Venda;
