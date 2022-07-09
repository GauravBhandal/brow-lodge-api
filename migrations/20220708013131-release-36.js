"use strict";

const queryUp = `
ALTER TABLE "progress_notes" DROP COLUMN "staff";

CREATE TABLE IF NOT EXISTS "participant_expenses" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "description" VARCHAR,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "total_expense" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_expenses" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "participant_expenses_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "participant_expenses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_expenses_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "participant_expenses_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_expenses_attachments";

ALTER TABLE "participant_expenses" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_expenses";

ALTER TABLE "progress_notes" ADD COLUMN  "staff" UUID REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
