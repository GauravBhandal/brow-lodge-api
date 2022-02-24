"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "restrictive_practice_logs" (
  "id" UUID NOT NULL,
  "is_authorised" VARCHAR NOT NULL,
  "type" VARCHAR (255) NOT NULL,
  "impact_on_any_person" VARCHAR NOT NULL,
  "injury_to_any_person" VARCHAR NOT NULL,
  "was_reportable_incident" VARCHAR NOT NULL,
  "reason_behind_use" VARCHAR NOT NULL,
  "describe_behaviour" VARCHAR NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "start_time" TIME WITHOUT TIME ZONE NOT NULL,
  "start_location" VARCHAR (255) NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_time" TIME WITHOUT TIME ZONE NOT NULL,
  "end_location" VARCHAR (255) NOT NULL,
  "any_witness" VARCHAR (255) NOT NULL,
  "action_taken_in_response" VARCHAR NOT NULL,
  "alternatives_considered" VARCHAR NOT NULL,
  "action_taken_leading_up_to" VARCHAR NOT NULL,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "restrictive_practice_logs_staff_profiles" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "restrictive_practice_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs_staff_profiles" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "restrictive_practice_logs_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs_staff_profiles";

ALTER TABLE "restrictive_practice_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
