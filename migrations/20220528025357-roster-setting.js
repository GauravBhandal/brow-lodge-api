"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "roster_setting" (
  "id" UUID NOT NULL,
  "settings" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "roster_setting" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "roster_setting" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "roster_setting";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
