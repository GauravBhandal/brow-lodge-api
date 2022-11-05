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

ALTER TABLE "corporate_risks" ADD COLUMN "overseen_by" VARCHAR;

CREATE TABLE IF NOT EXISTS "regulatory_compliances" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "title" VARCHAR (255) NOT NULL,
  "category" VARCHAR (255) NOT NULL,
  "notes" VARCHAR,
  "review_date" TIMESTAMP WITH TIME ZONE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "regulatory_compliances" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "regulatory_compliances_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "regulatory_compliances" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "regulatory_compliances_attachments" ENABLE ROW LEVEL SECURITY;

INSERT INTO incident_types VALUES
    ('df8ce683-b778-4a91-85d8-86693c0695ba', 'Assault', false, now(), now()),
    ('c02fc613-9569-424d-9d00-ef5a5fc0cbfa', 'Threat', false, now(), now()),
    ('a0a3e4fb-6b9e-4e07-bb4a-19ab1211643a', 'PRN Administration', false, now(), now()),
    ('e672a8aa-d5fe-4a00-a655-6a688b9f9ca6', 'Staff incident', false, now(), now());
`;

const queryDown = `
DELETE FROM "incident_types" WHERE id IN(
  'df8ce683-b778-4a91-85d8-86693c0695ba',
  'c02fc613-9569-424d-9d00-ef5a5fc0cbfa',
  'a0a3e4fb-6b9e-4e07-bb4a-19ab1211643a',
  'e672a8aa-d5fe-4a00-a655-6a688b9f9ca6'
);

ALTER TABLE "regulatory_compliances_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "regulatory_compliances_attachments";

ALTER TABLE "regulatory_compliances" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "regulatory_compliances";

ALTER TABLE "corporate_risks" DROP COLUMN "overseen_by";

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