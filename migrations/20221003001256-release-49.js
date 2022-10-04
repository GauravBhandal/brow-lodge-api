"use strict";

const queryUp = `
ALTER TABLE "client_profiles" ADD COLUMN "invoice_to" VARCHAR;

ALTER TABLE "companies" ADD COLUMN "account_bsb" VARCHAR, ADD COLUMN "account_number" VARCHAR, ADD COLUMN "account_name" VARCHAR;
`;

const queryDown = `
ALTER TABLE "companies" DROP COLUMN "account_bsb", DROP COLUMN "account_number", DROP COLUMN "account_name";

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
