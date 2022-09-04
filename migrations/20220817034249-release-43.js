"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "alert_configurations" (
  "id" UUID NOT NULL,
  "name" VARCHAR NOT NULL,
  "transport" JSONB,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "alert_configurations" ENABLE ROW LEVEL SECURITY;

INSERT INTO incident_types VALUES
    ('fb1b5dfe-81e4-440e-9ceb-a504279d1c98', 'Authorised use of restrictive practice', false, now(), now()),
    ('e2df1e1b-edbd-4dac-80ad-d7610c329015', 'Expired or damaged medication', false, now(), now()),
    ('e86a426b-e404-4ed1-bf38-e07896365bfc', 'Incorrect medication', false, now(), now()),
    ('516c0abe-7a2b-4a31-99a8-32e531748d26', 'Incorrect medication dose', false, now(), now()),
    ('3da5f30b-8151-4d96-a901-ccdb0c93f113', 'Incorrect medication time', false, now(), now()),
    ('a689b409-4185-48e8-80a1-f118b429528b', 'Incorrect storage of medication', false, now(), now()),
    ('d094dd78-c08f-4ce6-9f49-94c6027f1865', 'Medication not administered', false, now(), now())
`;

const queryDown = `
DELETE FROM "incident_types" WHERE id (
  'fb1b5dfe-81e4-440e-9ceb-a504279d1c98',
  'e2df1e1b-edbd-4dac-80ad-d7610c329015',
  'e86a426b-e404-4ed1-bf38-e07896365bfc',
  '516c0abe-7a2b-4a31-99a8-32e531748d26',
  '3da5f30b-8151-4d96-a901-ccdb0c93f113',
  'a689b409-4185-48e8-80a1-f118b429528b',
  'd094dd78-c08f-4ce6-9f49-94c6027f1865'
);

ALTER TABLE "alert_configurations" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "alert_configurations";

`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
