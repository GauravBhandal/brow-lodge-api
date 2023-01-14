"use strict";

const queryUp = `
ALTER TABLE "client_behaviours" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "doctor_visits" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "injury_reports" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "prn_admin_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "prn_balance_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "progress_notes" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "progress_reports" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "restrictive_practice_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "vehicle_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "staff_sleep_disturbances" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "staff_supervision_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "teams" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "participant_communication_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "participant_medication_charts" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

`;

const queryDown = `
ALTER TABLE "participant_medication_charts"
DROP COLUMN "archived";

ALTER TABLE "participant_communication_logs"
DROP COLUMN "archived";

ALTER TABLE "teams"
DROP COLUMN "archived";

ALTER TABLE "staff_supervision_logs"
DROP COLUMN "archived";

ALTER TABLE "staff_sleep_disturbances"
DROP COLUMN "archived";

ALTER TABLE "vehicle_logs"
DROP COLUMN "archived";

ALTER TABLE "restrictive_practice_logs"
DROP COLUMN "archived";

ALTER TABLE "progress_reports"
DROP COLUMN "archived";

ALTER TABLE "progress_notes"
DROP COLUMN "archived";

ALTER TABLE "prn_balance_logs"
DROP COLUMN "archived";

ALTER TABLE "prn_admin_logs"
DROP COLUMN "archived";

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
