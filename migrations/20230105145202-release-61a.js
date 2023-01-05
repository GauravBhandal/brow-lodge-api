"use strict";

const queryUp = `
ALTER TABLE "bowel_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "oxygen_saturation_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "seizure_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "sleep_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "sleep_logs"
DROP COLUMN "archived";

ALTER TABLE "seizure_logs"
DROP COLUMN "archived";

ALTER TABLE "oxygen_saturation_logs"
DROP COLUMN "archived";

ALTER TABLE "bowel_logs"
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
