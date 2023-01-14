"use strict";

const queryUp = `
ALTER TABLE "client_behaviours" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "doctor_visits" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "injury_reports" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

`;

const queryDown = `
ALTER TABLE "injury_reports"
DROP COLUMN "archived";

ALTER TABLE "doctor_visits"
DROP COLUMN "archived";

ALTER TABLE "client_behaviours"
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
