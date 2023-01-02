"use strict";

const queryUp = `
  ALTER TABLE "doctor_visits" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "doctor_visits"
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
