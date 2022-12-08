"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "restrictive_practice_logs_types" (
  "id" UUID NOT NULL,
  "restrictive_practice_log" UUID NOT NULL REFERENCES "restrictive_practice_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "type" VARCHAR NOT NULL,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs_types" ENABLE ROW LEVEL SECURITY;

INSERT INTO restrictive_practice_logs_types(id, restrictive_practice_log, type, created, updated)
  SELECT uuid_generate_v4(), id, type, NOW(), NOW() FROM restrictive_practice_logs;

ALTER TABLE "restrictive_practice_logs" ALTER COLUMN type DROP NOT NULL;
`;

const queryDown = `
ALTER TABLE "restrictive_practice_logs" ALTER COLUMN type SET NOT NULL;

ALTER TABLE "restrictive_practice_logs_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs_types";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
