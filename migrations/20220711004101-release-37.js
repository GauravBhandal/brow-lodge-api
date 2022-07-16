"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "legislation_registers_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "legislation_registers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "legislation_registers_attachments" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "service_deliveries" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "start_time" TIME WITHOUT TIME ZONE NOT NULL,
  "end_time" TIME WITHOUT TIME ZONE NOT NULL,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "service_deliveries" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `
ALTER TABLE "service_deliveries" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "service_deliveries";

ALTER TABLE "legislation_registers_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "legislation_registers_attachments";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
