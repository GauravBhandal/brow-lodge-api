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

CREATE TABLE IF NOT EXISTS "shift_types" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_types" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_records" (
  "id" UUID NOT NULL,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "staff" UUID REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_records" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_records_shift_types" (
  "id" UUID NOT NULL,
  "start_time" TIME WITHOUT TIME ZONE NOT NULL,
  "shift" UUID REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "type" UUID REFERENCES "shift_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_records_shift_types" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "shift_records_shift_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records_shift_types";

ALTER TABLE "shift_records" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records";

ALTER TABLE "shift_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_types";

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
