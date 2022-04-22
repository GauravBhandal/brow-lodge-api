"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "pay_levels" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "pay_levels" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "services" (
  "id" UUID NOT NULL,
  "code" VARCHAR (255) NOT NULL UNIQUE,
  "name" VARCHAR (255) NOT NULL,
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

CREATE TABLE IF NOT EXISTS "shift_records_services" (
  "id" UUID NOT NULL,
  "shift" UUID REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "start_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "service" UUID REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "shift_records_services" ENABLE ROW LEVEL SECURITY;

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

CREATE TABLE IF NOT EXISTS "timesheets" (
  "id" UUID NOT NULL,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "status" VARCHAR NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "timesheets" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "invoices" (
  "id" UUID NOT NULL,
  "last_exported_on" TIMESTAMP WITH TIME ZONE,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "status" VARCHAR NOT NULL,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "companies" ADD COLUMN "xero_token_set" JSONB;

ALTER TABLE "client_profiles" ADD COLUMN "account_code" VARCHAR;
`;

const queryDown = `
ALTER TABLE "client_profiles" DROP COLUMN "account_code";

ALTER TABLE "companies" DROP COLUMN "xero_token_set";

ALTER TABLE "invoices" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "invoices";

ALTER TABLE "timesheets" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "timesheets";

ALTER TABLE "shift_records_services" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "shift_records_services";

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

ALTER TABLE "pay_levels" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "pay_levels";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
