"use strict";

const queryUp = `

CREATE TABLE IF NOT EXISTS "mobile_settings" (
  "id" UUID NOT NULL,
  "transport" JSONB,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "mobile_settings" ENABLE ROW LEVEL SECURITY;
`;

const queryDown = `

ALTER TABLE "mobile_settings" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "mobile_settings";

`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
