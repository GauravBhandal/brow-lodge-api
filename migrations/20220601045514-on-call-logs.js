"use strict";
const queryUp = `

CREATE TABLE IF NOT EXISTS "on_call_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "duration" VARCHAR (255) NOT NULL,
    "communication_with" VARCHAR (255) NOT NULL,
    "description" VARCHAR NOT NULL,
    "actions" VARCHAR,
    "followup" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID REFERENCES "client_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "on_call_logs" ENABLE ROW LEVEL SECURITY;
`;
const queryDown = `
ALTER TABLE "on_call_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "on_call_logs";
`;
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
