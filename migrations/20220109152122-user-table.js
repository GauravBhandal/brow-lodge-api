"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS "companies" (
            "id" UUID NOT NULL,
            "name" VARCHAR(255) NOT NULL,
            "created" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
            "deleted" TIMESTAMP WITH TIME ZONE,
            PRIMARY KEY ("id")
          );
     `);

    await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS "users" (
            "id" UUID NOT NULL,
            "fullName" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL,
            "created" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
            "deleted" TIMESTAMP WITH TIME ZONE,
            PRIMARY KEY ("id")
          );
     `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "companies";
     `);

    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "users";
     `);
  },
};
