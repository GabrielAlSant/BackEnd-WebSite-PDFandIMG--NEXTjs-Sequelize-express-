'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.comprovante, { as:"comprovantes"})
    }
  }
  produto.init({
    nome: DataTypes.STRING,
    desc: DataTypes.STRING,
    img: DataTypes.UUID,
    preco: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'produto',
  });
  return produto;
};