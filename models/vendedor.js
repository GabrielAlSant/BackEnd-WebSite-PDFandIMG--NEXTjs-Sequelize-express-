'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.comprovante, { as:"comprovantes"})
    }
  }
  vendedor.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    turno: DataTypes.STRING,
    status: DataTypes.STRING,
    img: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'vendedor',
  });
  return vendedor;
};