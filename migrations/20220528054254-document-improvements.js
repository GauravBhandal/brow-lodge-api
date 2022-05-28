"use strict";

const queryUp = `
ALTER TABLE "staff_documents" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "client_documents" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE "client_document_categories" 
ADD COLUMN "is_confidential" BOOLEAN DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "client_document_categories"
DROP COLUMN "is_confidential";

ALTER TABLE "client_documents"
DROP COLUMN "archived";

ALTER TABLE "staff_documents"
DROP COLUMN "archived";
`;

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(queryDown);
  },
};
