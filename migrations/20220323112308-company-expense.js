"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "company_expenses" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "total_cost" DOUBLE PRECISION NOT NULL,
  "description" VARCHAR NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "company_expenses" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "company_expenses_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "company_expenses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "company_expenses_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "company_expenses_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "company_expenses_attachments";

ALTER TABLE "company_expenses" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "company_expenses";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
