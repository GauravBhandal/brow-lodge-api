"use strict";

const queryUp = `
ALTER TABLE "client_documents" ADD COLUMN "notes" VARCHAR;
ALTER TABLE "staff_documents" ADD COLUMN "notes" VARCHAR;

ALTER TABLE "shift_records" 
ADD COLUMN "notes" VARCHAR;
`;

const queryDown = `
ALTER TABLE "shift_records"
DROP COLUMN "notes";

ALTER TABLE "staff_documents" DROP COLUMN "notes";
ALTER TABLE "client_documents" DROP COLUMN "notes";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
