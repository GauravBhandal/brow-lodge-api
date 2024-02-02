"use strict";

const superPermissions = {
  role: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  staffProfile: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientProfile: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  eyelashExtension: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  eyelashExtensionDetail: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  waxConsultation: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  tintConsultation: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  tintConsultationDetail: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  waxConsultationDetail: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  company: {
    actions: {
      read: true,
      update: true,
    },
  },
};

const userPermissions = {
  role: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  staffProfile: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  clientProfile: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: false,
    },
  },
  eyelashExtension: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  eyelashExtensionDetail: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  waxConsultation: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  tintConsultation: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  tintConsultationDetail: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  waxConsultationDetail: {
    actions: {
      read: true,
      create: true,
      delete: false,
      update: true,
    },
  },
  company: {
    actions: {
      read: true,
      update: true,
    },
  },
};

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
          name: "Super Admin",
          permissions: JSON.stringify(superPermissions),
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "5e6f59bc-617e-4783-90b2-5440256a1c3a",
          name: "Admin",
          permissions: JSON.stringify(userPermissions),
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          name: "Super Admin",
          permissions: JSON.stringify(superPermissions),
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "c0f70357-3848-4e71-8669-eff19cf64c4a",
          name: "Admin",
          permissions: JSON.stringify(userPermissions),
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
          first_name: "Ben",
          last_name: "Ben",
          email: "benc1972@yahoo.co.uk",
          password:
            "$2a$10$2T8FGPgTTCjzU827AAl5Gu9X/Lqi/nW3qu11gWe6OJmMiXG1laStC",
          reset_password_token:
            "$2a$10$2T8FGPgTTCjzU827AAl5Gu9X/Lqi/nW3qu11gWe6OJmMiXG1laStC",
          blocked: false,
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "85bb62eb-4b2c-4300-be64-3ecc3cc3ae0c",
          first_name: "Staff",
          last_name: "Account",
          email: "staff@browlodge.co.uk",
          password:
            "$2a$10$JLzmvA2mO89OuRSaxgsrZuGpm0E94v.6GZAvYUgaRxnFHida9np6K",
          reset_password_token:
            "$2a$10$JLzmvA2mO89OuRSaxgsrZuGpm0E94v.6GZAvYUgaRxnFHida9np6K",
          blocked: false,
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
          first_name: "Gaurav",
          last_name: "Bhandal",
          email: "gaurav@gmail.com",
          password:
            "$2a$10$okPk0rYX36SPHFdzsfMJHOVP47ND9tPIHMMAX63Fx4sBwYLME9Vem",
          reset_password_token:
            "$2a$10$okPk0rYX36SPHFdzsfMJHOVP47ND9tPIHMMAX63Fx4sBwYLME9Vem",
          blocked: false,
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "d58fa835-8fb1-4378-bad1-c3d87ff469bd",
          first_name: "Riya",
          last_name: "Savant",
          email: "riya@gmail.com",
          password:
            "$2a$10$okPk0rYX36SPHFdzsfMJHOVP47ND9tPIHMMAX63Fx4sBwYLME9Vem",
          reset_password_token:
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
          first_name: "Ben",
          last_name: "Ben",
          email: "benc1972@yahoo.co.uk",
          date_of_birth: new Date(),
          personal_contact_number: "",
          address: "",
          job_title: "",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          user: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "f74e8000-b15b-4ae1-934d-b207ad385ca1",
          first_name: "Staff",
          last_name: "Account",
          email: "staff@browlodge.co.uk",
          date_of_birth: new Date(),
          personal_contact_number: "",
          address: "",
          job_title: "",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          user: "85bb62eb-4b2c-4300-be64-3ecc3cc3ae0c",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "7b052282-d57e-45c0-8cef-b39c949294b5",
          first_name: "Gaurav",
          last_name: "Bhandal",
          email: "gaurav@gmail.com",
          date_of_birth: new Date(),
          personal_contact_number: "7867868",
          address: "54,seaton, sa",
          job_title: "455354",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          user: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "a343c889-28ca-4b23-8435-8d457eac90d7",
          first_name: "Riya",
          last_name: "Savant",
          email: "riya@gmail.com",
          date_of_birth: new Date(),
          personal_contact_number: "7867868",
          address: "54,seaton, sa",
          job_title: "455354",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          user: "d58fa835-8fb1-4378-bad1-c3d87ff469bd",
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
          id: "52a432d9-498e-45c0-98fb-4b6b2bae2599",
          first_name: "Gaurav",
          last_name: "Bhandal",
          email: "gaurav@gmail.com",
          date_of_birth: new Date(),
          personal_contact_number: "7867868",
          address: "54,seaton, sa",
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
          id: "d3ef9452-8663-49d0-8955-fd6f5f4e8672",
          user: "85bb62eb-4b2c-4300-be64-3ecc3cc3ae0c",
          role: "5e6f59bc-617e-4783-90b2-5440256a1c3a",
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
        {
          id: "38cb443c-4558-4b2c-8fd5-6d32716e02d2",
          user: "d58fa835-8fb1-4378-bad1-c3d87ff469bd",
          role: "c0f70357-3848-4e71-8669-eff19cf64c4a",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("attachments", null, {});
    await queryInterface.bulkDelete("users_roles", null, {});
    await queryInterface.bulkDelete("staff_profiles", null, {});
    await queryInterface.bulkDelete("client_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("companies", null, {});
  },
};
