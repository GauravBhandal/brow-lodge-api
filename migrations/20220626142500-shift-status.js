"use strict";

const queryUp = `
ALTER TABLE "shift_records" ADD COLUMN "status" VARCHAR (255);
`;

const queryDown = `
ALTER TABLE "shift_records" DROP COLUMN "status";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
