"use strict";

const queryUp = `
ALTER TABLE "lease_and_utility_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

`;

const queryDown = `
ALTER TABLE "lease_and_utility_logs"
DROP COLUMN "archived";

`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
