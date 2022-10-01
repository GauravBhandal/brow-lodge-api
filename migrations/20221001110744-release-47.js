"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "progress_reports_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "progress_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_reports_attachments" ENABLE ROW LEVEL SECURITY;

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

ALTER TABLE "progress_reports_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_reports_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
