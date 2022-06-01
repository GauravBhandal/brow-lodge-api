"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "doctor_visit_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "doctor_visits" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "doctor_visit_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "client_risk_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "client_risks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "client_risk_attachments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "client_risks" 
ADD COLUMN "assessment_type"  VARCHAR (255);

`;

const queryDown = `
ALTER TABLE "client_risks"
DROP COLUMN "assessment_type";

ALTER TABLE "client_risk_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_risk_attachments";

ALTER TABLE "doctor_visit_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "doctor_visit_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
