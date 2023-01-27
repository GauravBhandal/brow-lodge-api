"use strict";

const queryUp = `
ALTER TABLE "repair_requests" 
ADD COLUMN "closure_date" TIMESTAMP WITH TIME ZONE,
ADD COLUMN "closed_by" UUID REFERENCES "staff_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

`;

const queryDown = `
ALTER TABLE "repair_requests"
DROP COLUMN "closure_date",
DROP COLUMN "closed_by";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
