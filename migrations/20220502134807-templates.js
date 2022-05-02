"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "templates" (
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
ALTER TABLE "templates" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "templates_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "templates_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "templates_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "templates_attachments";

ALTER TABLE "templates" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "templates";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
