"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "progress_notes_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "progress_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_notes_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "progress_notes_staff_profiles" (
  "id" UUID NOT NULL,
  "incident" UUID NOT NULL REFERENCES "progress_notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "progress_notes_staff_profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "progress_notes" 
ADD COLUMN "custom_fields" JSONB;
`;

const queryDown = `
ALTER TABLE "progress_notes"
DROP COLUMN "custom_fields";

ALTER TABLE "progress_notes_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes_staff_profiles";

ALTER TABLE "progress_notes_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
