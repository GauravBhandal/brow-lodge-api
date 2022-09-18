"use strict";

const queryUp = `
CREATE TABLE IF NOT EXISTS "whs_logs" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "next_review_date" TIMESTAMP WITH TIME ZONE,
  "category" VARCHAR (255) NOT NULL,
  "location" VARCHAR NOT NULL,
  "comments" VARCHAR ,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "whs_logs" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "whs_logs_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "whs_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "whs_logs_attachments" ENABLE ROW LEVEL SECURITY;

`;

const queryDown = `
ALTER TABLE "whs_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "whs_logs_attachments";

ALTER TABLE "whs_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "whs_logs";
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
