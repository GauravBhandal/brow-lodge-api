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
`;

const queryDown = `
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
