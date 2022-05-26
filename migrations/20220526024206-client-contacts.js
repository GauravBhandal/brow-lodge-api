"use strict";
const queryUp = `
ALTER TABLE "client_profiles" 
ADD COLUMN "contact_number" VARCHAR (255);

CREATE TABLE IF NOT EXISTS "client_contacts" (
  "id" UUID NOT NULL,
  "type"  VARCHAR (255) NOT NULL,
  "name"  VARCHAR (255) NOT NULL,
  "address"  VARCHAR (255),
  "email"  VARCHAR (255),
  "phone"  VARCHAR (255),
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "client_contacts" ENABLE ROW LEVEL SECURITY;
`;
const queryDown = `
ALTER TABLE "client_contacts" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_contacts";

ALTER TABLE "client_profiles"
DROP COLUMN "contact_number";
`;
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
