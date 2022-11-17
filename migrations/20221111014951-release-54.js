"use strict";

const queryUp = `
  ALTER TABLE "practice_guides" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "processes" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "rpdhs_resources" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "templates" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS "service_delivery_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "service_deliveries" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "service_delivery_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "service_delivery_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "service_delivery_attachments";

ALTER TABLE "templates"
DROP COLUMN "archived";

ALTER TABLE "rpdhs_resources"
DROP COLUMN "archived";

ALTER TABLE "processes"
DROP COLUMN "archived";

ALTER TABLE "practice_guides"
DROP COLUMN "archived";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
