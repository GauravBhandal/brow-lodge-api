"use strict";

const queryUp = `
INSERT INTO incident_types VALUES
  ('aef069ae-d7c2-45fa-ad72-ff17a3f84511', 'Witnessed fall of the participant', TRUE, now(), now()),
  ('8af9c40c-8e1a-476d-98c0-d952840d86d5', 'Unwitnessed fall of the participant', TRUE, now(), now());
`;

const queryDown = `
DELETE FROM "incident_types" WHERE id IN(
  'aef069ae-d7c2-45fa-ad72-ff17a3f84511',
  '8af9c40c-8e1a-476d-98c0-d952840d86d5'
  );
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryUp);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(queryDown);
  },
};



