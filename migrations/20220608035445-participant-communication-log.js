"use strict";
const queryUp = `

CREATE TABLE IF NOT EXISTS "participant_communication_logs" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "time" TIME WITHOUT TIME ZONE NOT NULL,
  "subject" VARCHAR (255) NOT NULL,
  "description" VARCHAR NOT NULL,
  "communication_with" VARCHAR (255),
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_communication_logs" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "participant_communication_logs_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "participant_communication_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "participant_communication_logs_attachments" ENABLE ROW LEVEL SECURITY;

`;
const queryDown = `
ALTER TABLE "participant_communication_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_communication_logs_attachments";

ALTER TABLE "participant_communication_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "participant_communication_logs";

`;
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
