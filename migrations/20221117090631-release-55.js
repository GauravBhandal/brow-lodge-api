"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "continuous_improvements" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "source" VARCHAR NOT NULL,
    "improvement" VARCHAR NOT NULL,
    "action" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL,
    "due_date" TIMESTAMP WITH TIME ZONE,
    "next_review_date" TIMESTAMP WITH TIME ZONE,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
  );
  ALTER TABLE "continuous_improvements" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "continuous_improvements" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "continuous_improvements";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
