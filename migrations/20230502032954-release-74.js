"use strict";

const queryUp = `

CREATE TABLE IF NOT EXISTS "clockin_clockouts" (
  "id" UUID NOT NULL,
  "start_date_time" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date_time" TIMESTAMP WITH TIME ZONE,
  "check_in_location" VARCHAR NOT NULL,
  "check_out_location" VARCHAR ,
  "check_in_attachment" UUID,
  "check_out_attachment" UUID,
  "shift_id" UUID NOT NULL REFERENCES "shift_records" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "clockin_clockouts" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "clockin_clockouts" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "clockin_clockouts";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
