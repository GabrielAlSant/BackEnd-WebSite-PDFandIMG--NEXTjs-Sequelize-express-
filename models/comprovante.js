'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comprovante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.cliente, {as: "cliente"}),
      this.belongsTo(models.vendedor, {as: "vendedor"}),
      this.belongsTo(models.produto, { as:"produto"})
    }
  }
  comprovante.init({
    vendedorId: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER,
    valor: DataTypes.DOUBLE,
    tipo: DataTypes.STRING,
    data: DataTypes.DATE,
    comprovant: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'comprovante',
  });
  return comprovante;
};