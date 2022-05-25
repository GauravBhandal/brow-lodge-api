"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "meeting_logs_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "meeting_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "meeting_logs_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "meeting_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "meeting_logs_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
