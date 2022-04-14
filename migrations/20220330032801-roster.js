"use strict";

const queryUp = `
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

CREATE TABLE IF NOT EXISTS "services" (
  "id" UUID NOT NULL,
  "code" VARCHAR (255) NOT NULL UNIQUE,
  "description" VARCHAR (255) NOT NULL,
  "effective_date" TIMESTAMP WITH TIME ZONE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "services" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_repeats" (
  "id" UUID NOT NULL,
  "meta" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_repeats" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_records" (
  "id" UUID NOT NULL,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "break" DOUBLE PRECISION,
  "repeat" UUID REFERENCES "shift_repeats" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
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

CREATE TABLE IF NOT EXISTS "shift_records_staff_profiles" (
  "id" UUID NOT NULL,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_records_staff_profiles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_records_client_profiles" (
  "id" UUID NOT NULL,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_records_client_profiles" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "shift_records_shift_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records_shift_types";

ALTER TABLE "shift_records_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records_staff_profiles";

ALTER TABLE "shift_records_client_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records_client_profiles";

ALTER TABLE "shift_records" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records";

ALTER TABLE "shift_repeats" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_repeats";

ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "services";

ALTER TABLE "shift_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_types";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
