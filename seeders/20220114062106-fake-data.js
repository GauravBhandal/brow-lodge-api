"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "companies",
      [
        {
          id: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          name: "Company 1",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "d587b3ba-69a6-4d46-a42a-113eed378310",
          name: "Company 2",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "ae09d6cb-7cb8-49bb-90d9-e2e6801ad70e",
          name: "Role 1",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          name: "Role 2",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          first_name: "Yasmine",
          last_name: "Sidhu",
          email: "yasmine@carediary.com.au",
          password:
            "$2a$10$qXfVzBGer9Tu5sjuTW45Susi1hVaHEWaeASiE7QDoRz9Kvq9ZnzPa",
          blocked: false,
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
          first_name: "Pavi",
          last_name: "Sidhu",
          email: "pavi@carediary.com.au",
          password:
            "$2a$10$okPk0rYX36SPHFdzsfMJHOVP47ND9tPIHMMAX63Fx4sBwYLME9Vem",
          blocked: false,
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "staff_profiles",
      [
        {
          id: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          first_name: "Pavi",
          last_name: "Sidhu",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "7b052282-d57e-45c0-8cef-b39c949294b5",
          first_name: "Yasmine",
          last_name: "Sidhu",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "client_profiles",
      [
        {
          id: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          first_name: "Chris",
          last_name: "Green",
          preferred_name: "Chris",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "7b052282-d57e-45c0-8cef-b39c949294b5",
          first_name: "John",
          last_name: "Wills",
          preferred_name: "John",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "progress_notes",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          notes: "Company 1 Notes",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          notes: "Company 2 Notes",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "users_roles",
      [
        {
          id: "60e422c0-efdd-4fac-8230-5cc56de5aa8d",
          user: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          role: "ae09d6cb-7cb8-49bb-90d9-e2e6801ad70e",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "bceb5877-6d34-4d54-a09a-e93481f4542b",
          user: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          role: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "541ca221-7ca8-4679-8fcd-344cb4af9678",
          user: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
          role: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("progress_notes", null, {});
    await queryInterface.bulkDelete("client_profiles", null, {});
    await queryInterface.bulkDelete("staff_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("companies", null, {});
  },
};
