"use strict";

const queryUp = `
ALTER TABLE "temperature_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "temperature_logs"
DROP COLUMN "archived";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },
};
