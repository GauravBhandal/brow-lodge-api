"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "teams" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "permissions" BOOLEAN DEFAULT FALSE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "teams" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "teams_staff_profiles" (
  "id" UUID NOT NULL,
  "team" UUID NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "teams_staff_profiles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "teams_client_profiles" (
  "id" UUID NOT NULL,
  "team" UUID NOT NULL REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "teams_client_profiles" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `

ALTER TABLE "teams_client_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "teams_client_profiles";

ALTER TABLE "teams_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "teams_staff_profiles";

ALTER TABLE "teams" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "teams";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
