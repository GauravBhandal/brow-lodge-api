"use strict";

const queryUp = `
  ALTER TABLE "client_risks" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "client_risks"
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
