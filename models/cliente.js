'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.comprovante, { as:"comprovantes"})
    }
  }
  cliente.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    img: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'cliente',
  });
  return cliente;
};