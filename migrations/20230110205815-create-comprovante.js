'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comprovantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendedorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "vendedors",
          key: "id"
        }
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: "clientes",
          key: "id"
        }
      },
      produtoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "produtos",
          key: "id"
        }
      },
      valor: {
        type: Sequelize.DOUBLE
      },
      tipo: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATE
      },
      comprovant: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comprovantes');
  }
};