"use strict";

const queryUp = `
  ALTER TABLE "medication_registers" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "medication_registers"
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
