"use strict";

const queryUp = `
ALTER TABLE "client_profiles" ADD COLUMN "invoice_to" VARCHAR;

ALTER TABLE "companies" ADD COLUMN "account_bsb" VARCHAR, ADD COLUMN "account_number" VARCHAR, ADD COLUMN "account_name" VARCHAR;

CREATE TABLE IF NOT EXISTS "medication_registers" (
  "id" UUID NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE,
  "medication_name" VARCHAR NOT NULL,
  "administration_type" VARCHAR NOT NULL,
  "dosage" VARCHAR NOT NULL,
  "frequency" VARCHAR NOT NULL,
  "is_prescribed" VARCHAR,
  "notes" VARCHAR,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "medication_registers" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "client_documents" ADD COLUMN "notes" VARCHAR;

ALTER TABLE "staff_documents" ADD COLUMN "notes" VARCHAR;
`;

const queryDown = `
ALTER TABLE "staff_documents" DROP COLUMN "notes";

ALTER TABLE "client_documents" DROP COLUMN "notes";

ALTER TABLE "medication_registers" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "medication_registers";

ALTER TABLE "companies" DROP COLUMN "account_bsb", DROP COLUMN "account_number", DROP COLUMN "account_name";

ALTER TABLE "client_profiles" DROP COLUMN "invoice_to";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
