"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "key_decisions" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,,
  "description" VARCHAR NOT NULL,
  "decision_rationale" VARCHAR NOT NULL,
  "alternatives_considered" VARCHAR,
  "cost_implications" VARCHAR,
  "staff" UUID REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "key_decisions" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "key_decisions" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "key_decisions";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
