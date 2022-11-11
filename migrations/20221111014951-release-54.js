"use strict";

const queryUp = `
  ALTER TABLE "practice_guides" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;


ALTER TABLE "processes" 
ADD COLUMN "archived" BOOLEAN NOT NULL DEFAULT FALSE;
`;

const queryDown = `
ALTER TABLE "processes"
DROP COLUMN "archived";

ALTER TABLE "practice_guides"
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
