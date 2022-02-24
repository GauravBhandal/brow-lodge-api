"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "expense_reimbursements_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "expense_reimbursements" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "expense_reimbursements_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "expense_reimbursements_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expense_reimbursements_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
