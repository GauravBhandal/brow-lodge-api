"use strict";

const queryUp = `
ALTER TABLE "client_profiles" ADD COLUMN "invoice_to" VARCHAR;
`;

const queryDown = `
ALTER TABLE "client_profiles" DROP COLUMN "invoice_to";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
