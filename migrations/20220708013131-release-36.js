"use strict";

const queryUp = `
ALTER TABLE "progress_notes" DROP COLUMN "staff";
`;

const queryDown = `
ALTER TABLE "progress_notes" ADD COLUMN  "staff" UUID REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
