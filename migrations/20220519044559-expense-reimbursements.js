"use strict";

const queryUp = `
ALTER TABLE "expense_reimbursements" 
ADD COLUMN "payment_status" VARCHAR (255);`;

const queryDown = `
ALTER TABLE "expense_reimbursements"
DROP COLUMN "payment_status";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
