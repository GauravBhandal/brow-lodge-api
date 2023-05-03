"use strict";

const queryUp = `
ALTER TABLE "progress_notes" 
ADD COLUMN "shift" UUID REFERENCES "shift_records" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
`;

const queryDown = `
ALTER TABLE "progress_notes"
DROP COLUMN "shift";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
