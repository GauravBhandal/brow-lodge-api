"use strict";

const queryUp = `
ALTER TABLE "staff_profiles" ADD COLUMN "profile_status" VARCHAR (255);

`;

const queryDown = `
ALTER TABLE "staff_profiles" DROP COLUMN "profile_status";

`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
