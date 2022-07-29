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
`;

const queryDown = `
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
