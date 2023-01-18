"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "sites" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "location" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "sites" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "sites_client_profiles" (
  "id" UUID NOT NULL,
  "site" UUID NOT NULL REFERENCES "sites" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "sites_client_profiles" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "sites_client_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "sites_client_profiles";

ALTER TABLE "sites" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "sites";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
