"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "legislation_registers" (
  "id" UUID NOT NULL,
  "reviewed_on" TIMESTAMP WITH TIME ZONE NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "domain" VARCHAR NOT NULL,
  "legislative_reference"  VARCHAR NOT NULL,
  "document_reference"  VARCHAR NOT NULL,
  "monitoring_mechanism"  VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "legislation_registers" ENABLE ROW LEVEL SECURITY;

`;

const queryDown = `
ALTER TABLE "legislation_registers" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "legislation_registers";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
