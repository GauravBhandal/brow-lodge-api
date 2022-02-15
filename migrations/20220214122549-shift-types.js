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
ALTER TABLE "teams" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "teams" DISABLE ROW LEVEL SECURITY;
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
