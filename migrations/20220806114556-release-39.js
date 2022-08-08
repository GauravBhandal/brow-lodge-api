"use strict";

const queryUp = `

DROP TABLE IF EXISTS "company_expenses_attachments";
DROP TABLE IF EXISTS "company_expenses";

DROP TABLE IF EXISTS "participant_expenses_attachments";
DROP TABLE IF EXISTS "participant_expenses";

DROP TABLE IF EXISTS "expense_reimbursements_attachments";
DROP TABLE IF EXISTS "expense_reimbursements";
`;

const queryDown = ``;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
