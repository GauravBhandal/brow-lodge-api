"use strict";

const queryUp = `
ALTER TABLE "client_document_categories" 
ADD COLUMN "is_confidential" BOOLEAN DEFAULT FALSE;`;

const queryDown = `
ALTER TABLE "client_document_categories"
DROP COLUMN "is_confidential";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },
  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
