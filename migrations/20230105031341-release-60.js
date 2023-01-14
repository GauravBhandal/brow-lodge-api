"use strict";

const queryUp = `
ALTER TABLE "blood_glucose_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "blood_pressure_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "blood_pressure_logs"
DROP COLUMN "archived";

ALTER TABLE "blood_glucose_logs"
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
