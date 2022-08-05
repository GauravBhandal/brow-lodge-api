"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "expenses" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "total_expense" DOUBLE PRECISION NOT NULL,
  "description" VARCHAR NOT NULL,
  "paid_by" VARCHAR NOT NULL,
  "status" VARCHAR NOT NULL,
  "payment_reimbursed" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "temp_column" UUID,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "expenses" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "expenses_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "expenses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "expenses_attachments" ENABLE ROW LEVEL SECURITY;


INSERT INTO expenses(id, date, staff, total_expense, description, paid_by, status, payment_reimbursed, company, temp_column, created, updated)
SELECT uuid_generate_v4(), date, staff, total_cost, description, 'Company', 'Pending', 'Not Applicable', company, id, created, updated FROM company_expenses;

INSERT INTO expenses_attachments(id, relation, attachment, created, updated)
SELECT uuid_generate_v4(), e.id, cea.attachment, cea.created, cea.updated FROM expenses as e 
INNER JOIN company_expenses_attachments as cea ON e.temp_column = cea.relation;


INSERT INTO expenses(id, date, staff, total_expense, description, paid_by, status, payment_reimbursed, company, temp_column, created, updated)
SELECT uuid_generate_v4(), date, staff, total_cost, description, 'Staff', 'Pending', 'No', company, id, created, updated FROM expense_reimbursements;

INSERT INTO expenses_attachments(id, relation, attachment, created, updated)
SELECT uuid_generate_v4(), e.id, era.attachment, era.created, era.updated FROM expenses as e 
INNER JOIN expense_reimbursements_attachments as era ON e.temp_column = era.relation;


INSERT INTO expenses(id, date, staff, client, total_expense, description, paid_by, status, payment_reimbursed, company, temp_column, created, updated)
SELECT uuid_generate_v4(), date, staff, client, total_expense, '', 'Participant', 'Pending', 'Not Applicable', company, id, created, updated FROM participant_expenses;

INSERT INTO expenses_attachments(id, relation, attachment, created, updated)
SELECT uuid_generate_v4(), e.id, pea.attachment, pea.created, pea.updated FROM expenses as e 
INNER JOIN participant_expenses_attachments as pea ON e.temp_column = pea.relation;

ALTER TABLE "expenses" DROP COLUMN "temp_column";

ALTER TABLE "client_risks" ADD COLUMN "next_review_date" TIMESTAMP WITH TIME ZONE;

ALTER TABLE "corporate_risks" ADD COLUMN "next_review_date" TIMESTAMP WITH TIME ZONE;
`;

const queryDown = `
ALTER TABLE "corporate_risks" DROP COLUMN "next_review_date";

ALTER TABLE "client_risks" DROP COLUMN "next_review_date";

ALTER TABLE "expenses_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expenses_attachments";

ALTER TABLE "expenses" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expenses";

`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
