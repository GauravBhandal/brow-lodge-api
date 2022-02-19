"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "incident_types" (
  "id" UUID NOT NULL,
  "type" VARCHAR NOT NULL,
  "is_reportable" BOOLEAN NOT NULL DEFAULT FALSE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_types" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "incident_reports" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "location" VARCHAR NOT NULL,
    "incident_description" VARCHAR NOT NULL,
    "events_prior_to_incident" VARCHAR NOT NULL,
    "actions_taken_by_staff" VARCHAR NOT NULL,
    "actions_taken_by_others" VARCHAR NOT NULL,
    "any_other_witness" VARCHAR NOT NULL,
    "incident_reported_to" VARCHAR,
    "assessment_and_debriefing" VARCHAR,
    "findings_and_actions_taken" VARCHAR,
    "status" VARCHAR,
    "closure_date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "manager" UUID REFERENCES "staff_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "incident_reports_staff_profiles" (
  "id" UUID NOT NULL,
  "incident" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_staff_profiles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "incident_reports_incident_types" (
  "id" UUID NOT NULL,
  "incident" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "type" UUID NOT NULL REFERENCES "incident_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_incident_types" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "incident_reports_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_attachments" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "incident_reports_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_attachments";

ALTER TABLE "incident_reports_incident_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_incident_types";

ALTER TABLE "incident_reports_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_staff_profiles";

ALTER TABLE "incident_reports" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports";

ALTER TABLE "incident_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_types";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
    await queryInterface.bulkInsert(
      "incident_types",
      [
        {
          id: "47dabc02-e801-48ca-9f92-8499cc05b021",
          type: "Assualt",
          is_reportable: false,
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "fd78d1c1-6c36-4cb8-80fa-f139afa606ea",
          type: "Theft",
          is_reportable: false,
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("incident_types", null, {});
    await queryInterface.sequelize.query(queryDown);
  },
};
