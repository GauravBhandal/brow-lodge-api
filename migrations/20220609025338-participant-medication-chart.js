"use strict";
const queryUp = `

CREATE TABLE IF NOT EXISTS "participant_medication_charts" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "level_of_support_required" VARCHAR (255) NOT NULL,
  "notes" VARCHAR NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_medication_charts" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "participant_medication_charts_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "participant_medication_charts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_medication_charts_attachments" ENABLE ROW LEVEL SECURITY;

`;
const queryDown = `
ALTER TABLE "participant_medication_charts_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_medication_charts_attachments";

ALTER TABLE "participant_medication_charts" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_medication_charts";

`;
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
