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
          CREATE TABLE IF NOT EXISTS "roles" (
            "id" UUID NOT NULL,
            "name" VARCHAR(255) NOT NULL,
            "description" VARCHAR(255),
            "permissions" JSONB,
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

    await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS "staffProfiles" (
            "id" UUID NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "created" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
            "deleted" TIMESTAMP WITH TIME ZONE,
            PRIMARY KEY ("id")
          );
    `);

    await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS "clientProfiles" (
            "id" UUID NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            "created" TIMESTAMP WITH TIME ZONE NOT NULL,
            "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
            "deleted" TIMESTAMP WITH TIME ZONE,
            PRIMARY KEY ("id")
          );
    `);

    await queryInterface.sequelize.query(`
          CREATE TABLE IF NOT EXISTS "progressNotes" (
            "id" UUID NOT NULL,
            "notes" VARCHAR NOT NULL,
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
          DROP TABLE IF EXISTS "roles";
    `);

    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "users";
    `);

    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "staffProfiles";
    `);

    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "clientProfiles";
    `);

    await queryInterface.sequelize.query(`
          DROP TABLE IF EXISTS "progressNotes";
    `);
  },
};
