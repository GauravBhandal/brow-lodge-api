"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "sleep_logs" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "time" TIME WITHOUT TIME ZONE NOT NULL,
  "activity" VARCHAR (255) NOT NULL,
  "comments" VARCHAR,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "sleep_logs" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "sleep_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "sleep_logs";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
