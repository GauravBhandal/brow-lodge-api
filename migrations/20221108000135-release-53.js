"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "service_delivery_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "service_deliveries" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "service_delivery_attachments" ENABLE ROW LEVEL SECURITY;

`;

const queryDown = `
ALTER TABLE "service_delivery_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "service_delivery_attachments";

`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
