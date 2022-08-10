"use strict";

const queryUp = `

DROP TABLE IF EXISTS "company_expenses_attachments";
DROP TABLE IF EXISTS "company_expenses";

DROP TABLE IF EXISTS "participant_expenses_attachments";
DROP TABLE IF EXISTS "participant_expenses";

DROP TABLE IF EXISTS "expense_reimbursements_attachments";
DROP TABLE IF EXISTS "expense_reimbursements";

CREATE TABLE IF NOT EXISTS "participant_goal" (
  "id" UUID NOT NULL,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR NOT NULL,
  "strategy" VARCHAR NOT NULL,
  "support" VARCHAR NOT NULL,
  "type" VARCHAR NOT NULL,
  "status" VARCHAR NOT NULL,
  "comments" VARCHAR,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "review_date" TIMESTAMP WITH TIME ZONE,
  "due_date" TIMESTAMP WITH TIME ZONE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_goal" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "participant_goal" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_goal";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
