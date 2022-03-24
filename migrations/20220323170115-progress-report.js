"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "progress_reports" (
  "id" UUID NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "documented_on" TIMESTAMP WITH TIME ZONE NOT NULL,
  "progress_notes" VARCHAR NOT NULL,
  "behaviour_of_concerns" VARCHAR NOT NULL,
  "diet" VARCHAR NOT NULL,
  "fluids" VARCHAR NOT NULL,
  "activities" VARCHAR NOT NULL,
  "choking_observations" VARCHAR,
  "appointments_or_family_visits" VARCHAR,
  "staff_administered_medication" VARCHAR,
  "ndis_goal_setting" VARCHAR,
  "independent_skills" VARCHAR,
  "community_access" VARCHAR,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_reports" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "progress_reports" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_reports";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
