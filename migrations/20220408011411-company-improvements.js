"use strict";

const queryUp = `
ALTER TABLE "companies" 
ADD COLUMN "website" VARCHAR,
ADD COLUMN "email" VARCHAR,
ADD COLUMN "ndis_registration_number" VARCHAR,
ADD COLUMN "timezone" VARCHAR;
`;

const queryDown = `
ALTER TABLE "companies"
DROP COLUMN "website",
DROP COLUMN "email",
DROP COLUMN "ndis_registration_number",
DROP COLUMN "timezone";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
