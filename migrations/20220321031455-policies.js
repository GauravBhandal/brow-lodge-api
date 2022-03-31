"use strict";

const queryUp = `
  CREATE TABLE IF NOT EXISTS "policies" (
  "id" UUID NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "name" VARCHAR NOT NULL,
  "version" VARCHAR NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "policies" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "policies_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "policies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "policies_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "policies_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "policies_attachments";

ALTER TABLE "policies" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "policies";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
