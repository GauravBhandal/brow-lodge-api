"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "client_assets_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "client_assets" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "client_assets_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "company_assets_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "company_assets" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "company_assets_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "conflict_of_interests_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "conflict_of_interests" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "conflict_of_interests_attachments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "internal_registers" 
ADD COLUMN  "next_review_date" TIMESTAMP WITH TIME ZONE;

CREATE TABLE IF NOT EXISTS "progress_notes_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "progress_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_notes_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "progress_notes_staff_profiles" (
  "id" UUID NOT NULL,
  "progress_note" UUID NOT NULL REFERENCES "progress_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_notes_staff_profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "progress_notes" ADD COLUMN "custom_fields_data" JSONB;

CREATE TABLE IF NOT EXISTS "progress_notes_settings" (
  "id" UUID NOT NULL,
  "custom_fields" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_progress_notes_settings_company ON progress_notes_settings(company);
ALTER TABLE "progress_notes_settings" ENABLE ROW LEVEL SECURITY;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO progress_notes_staff_profiles(id, progress_note, staff, created, updated)
SELECT uuid_generate_v4(), id, staff, NOW(), NOW() FROM progress_notes;

ALTER TABLE "progress_notes" ALTER COLUMN staff DROP NOT NULL;
`;

const queryDown = `
ALTER TABLE "progress_notes" ALTER COLUMN staff SET NOT NULL;

DROP EXTENSION "uuid-ossp";

ALTER TABLE "progress_notes_settings" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes_settings";

ALTER TABLE "progress_notes" DROP COLUMN "custom_fields_data";

ALTER TABLE "progress_notes_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes_staff_profiles";

ALTER TABLE "progress_notes_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes_attachments";

ALTER TABLE "internal_registers"
DROP COLUMN "next_review_date";

ALTER TABLE "conflict_of_interests_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "conflict_of_interests_attachments";

ALTER TABLE "company_assets_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "company_assets_attachments";

ALTER TABLE "client_assets_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_assets_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
