"use strict";

const queryUp = `
  ALTER TABLE "participant_goals" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "participant_goals"
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
