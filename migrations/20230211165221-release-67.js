"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "staff_unavailability_repeat" (
  "id" UUID NOT NULL,
  "meta" JSONB NOT NULL,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_staff_unavailability_repeat_company ON staff_unavailability_repeat(company);
ALTER TABLE "staff_unavailability_repeat" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "staff_unavailability" (
  "id" UUID NOT NULL,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "repeat" UUID REFERENCES "staff_unavailability_repeat" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
CREATE INDEX idx_staff_unavailability_company ON staff_unavailability(company);
ALTER TABLE "staff_unavailability" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `

ALTER TABLE "staff_unavailability" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_unavailability";

ALTER TABLE "staff_unavailability_repeat" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_unavailability_repeat";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};



