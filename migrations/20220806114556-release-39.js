"use strict";

const queryUp = `

DROP TABLE IF EXISTS "company_expenses_attachments";
DROP TABLE IF EXISTS "company_expenses";

DROP TABLE IF EXISTS "participant_expenses_attachments";
DROP TABLE IF EXISTS "participant_expenses";

DROP TABLE IF EXISTS "expense_reimbursements_attachments";
DROP TABLE IF EXISTS "expense_reimbursements";

CREATE TABLE IF NOT EXISTS "participant_goals" (
  "id" UUID NOT NULL,
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
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_goals" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "external_contracts" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "name" VARCHAR (255) NOT NULL,
  "notes" VARCHAR,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "external_contracts" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "external_contracts_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "external_contracts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "external_contracts_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "external_contracts_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "external_contracts_attachments";

ALTER TABLE "external_contracts" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "external_contracts";

ALTER TABLE "participant_goals" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_goals";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
