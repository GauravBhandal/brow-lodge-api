"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "restrictive_practice_register" (
  "id" UUID NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE,
  "start_time" TIME WITHOUT TIME ZONE NOT NULL,
  "end_time" TIME WITHOUT TIME ZONE,
  "type_of_restrictive_practice" VARCHAR (255) NOT NULL,
  "description" VARCHAR NOT NULL,
  "administration_type" VARCHAR (255) NOT NULL,
  "behaviour_of_concerns" VARCHAR NOT NULL,
  "is_authorised" VARCHAR (255) NOT NULL,
  "reporting_frequency" VARCHAR (255) NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_register" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "restrictive_practice_register" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_register";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
