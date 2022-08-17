"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "alert_configurations" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "transport" JSONB,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "alert_configurations" ENABLE ROW LEVEL SECURITY;

`;

const queryDown = `
ALTER TABLE "alert_configurations" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "alert_configurations";

`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
