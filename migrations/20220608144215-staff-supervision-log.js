"use strict";
const queryUp = `

CREATE TABLE IF NOT EXISTS "staff_supervision_logs" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "next_due_on" TIMESTAMP WITH TIME ZONE NOT NULL,
  "type" VARCHAR (255) NOT NULL,
  "notes" VARCHAR,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "staff_supervision_logs" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "staff_supervision_logs_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "staff_supervision_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "staff_supervision_logs_attachments" ENABLE ROW LEVEL SECURITY;

`;
const queryDown = `
ALTER TABLE "staff_supervision_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_supervision_logs_attachments";

ALTER TABLE "staff_supervision_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_supervision_logs";

`;
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
