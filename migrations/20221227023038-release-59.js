"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "restrictive_practice_logs_types" (
  "id" UUID NOT NULL,
  "restrictive_practice_log" UUID NOT NULL REFERENCES "restrictive_practice_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "type" VARCHAR NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs_types" ENABLE ROW LEVEL SECURITY;

INSERT INTO restrictive_practice_logs_types(id, restrictive_practice_log, type, created, updated)
  SELECT uuid_generate_v4(), id, 'type', NOW(), NOW() FROM restrictive_practice_logs;

ALTER TABLE "restrictive_practice_logs" ALTER COLUMN type DROP NOT NULL;

ALTER TABLE "repair_requests" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "maintenance_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "lease_and_utility_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "company_assets" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "client_assets" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "conflict_of_interests" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "continuous_improvements" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "corporate_risks" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "key_decisions" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "internal_registers" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "legislation_registers" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "regulatory_compliances" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "whs_logs" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

`;

const queryDown = `
ALTER TABLE "whs_logs"
DROP COLUMN "archived";

ALTER TABLE "regulatory_compliances"
DROP COLUMN "archived";

ALTER TABLE "legislation_registers"
DROP COLUMN "archived";

ALTER TABLE "internal_registers"
DROP COLUMN "archived";

ALTER TABLE "key_decisions"
DROP COLUMN "archived";

ALTER TABLE "corporate_risks"
DROP COLUMN "archived";

ALTER TABLE "continuous_improvements"
DROP COLUMN "archived";

ALTER TABLE "conflict_of_interests"
DROP COLUMN "archived";

ALTER TABLE "client_assets"
DROP COLUMN "archived";

ALTER TABLE "company_assets"
DROP COLUMN "archived";

ALTER TABLE "lease_and_utility_logs"
DROP COLUMN "archived";

ALTER TABLE "maintenance_logs"
DROP COLUMN "archived";

ALTER TABLE "repair_requests"
DROP COLUMN "archived";

ALTER TABLE "restrictive_practice_logs_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs_types";

`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};