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
CREATE INDEX idx_pay_levels_company ON pay_levels(company);
ALTER TABLE "pay_levels" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "services" (
  "id" UUID NOT NULL,
  "code" VARCHAR (255) NOT NULL,
  "rate_type" VARCHAR (255) NOT NULL,    
  "archived" BOOLEAN NOT NULL DEFAULT FALSE,
  "name" VARCHAR (255) NOT NULL,
  "effective_date" TIMESTAMP WITH TIME ZONE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_services_company ON services(company);
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
CREATE INDEX idx_shift_repeats_company ON shift_repeats(company);
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
CREATE INDEX idx_shift_records_company ON shift_records(company);
ALTER TABLE "shift_records" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "shift_records_services" (
  "id" UUID NOT NULL,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "start_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "service" UUID NOT NULL REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
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
  "last_exported_on" TIMESTAMP WITH TIME ZONE,
  "status" VARCHAR NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "shift" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_timesheets_company ON timesheets(company);
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
CREATE INDEX idx_invoices_company ON invoices(company);
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "client_profiles" ADD COLUMN "accounting_code" VARCHAR;

ALTER TABLE "staff_profiles" ADD COLUMN "accounting_code" VARCHAR;

CREATE TABLE IF NOT EXISTS "integrations" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "key" VARCHAR NOT NULL,
  "meta" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_integrations_company ON integrations(company);
ALTER TABLE "integrations" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "integrations_external_data" (
  "id" UUID NOT NULL,
  "type" VARCHAR NOT NULL,
  "data" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "integration" UUID NOT NULL REFERENCES "integrations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_integrations_external_data_company ON integrations_external_data(company);
ALTER TABLE "integrations_external_data" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "services_pay_levels" (
  "id" UUID NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "service" UUID NOT NULL REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "paylevel" UUID NOT NULL REFERENCES "pay_levels" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "payitem" UUID NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_services_pay_levels_company ON services_pay_levels(company);
ALTER TABLE "services_pay_levels" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "staff_profiles" ADD COLUMN "paylevel" UUID REFERENCES "pay_levels" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "roster_setting" (
  "id" UUID NOT NULL,
  "settings" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_roster_setting_company ON roster_setting(company);
ALTER TABLE "roster_setting" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "roster_setting" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "roster_setting";

ALTER TABLE "staff_profiles" DROP COLUMN "paylevel";

ALTER TABLE "services_pay_levels" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "services_pay_levels";

ALTER TABLE "integrations_external_data" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "integrations_external_data";

ALTER TABLE "integrations" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "integrations";

ALTER TABLE "staff_profiles" DROP COLUMN "accounting_code";

ALTER TABLE "client_profiles" DROP COLUMN "accounting_code";

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