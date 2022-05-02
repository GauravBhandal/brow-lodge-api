"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "internal_registers" (
  "id" UUID NOT NULL,
  "notes" VARCHAR,
  "name" VARCHAR NOT NULL,
  "version" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "internal_registers" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "internal_registers_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "internal_registers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "internal_registers_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "internal_registers_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "internal_registers_attachments";

ALTER TABLE "internal_registers" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "internal_registers";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
