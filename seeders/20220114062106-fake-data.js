"use strict";

const permissions = {
  role: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  team: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  policy: {
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
  bowelLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  feedback: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  resource: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  sleepLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  weightLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientRisk: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  meetingLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  seizureLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  vehicleLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientAsset: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  doctorVisit: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  keyDecision: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  prnAdminLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  companyAsset: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  injuryReport: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  policyReview: {
    actions: {
      read: true,
      delete: true,
      update: true,
    },
  },
  progressNote: {
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
      update: true,
    },
  },
  clientProfile: {
    actions: {
      read: true,
      create: true,
      update: true,
    },
  },
  corporateRisk: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  prnBalanceLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  repairRequest: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  staffArchived: {
    actions: {
      read: true,
      update: true,
    },
  },
  staffDocument: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientArchived: {
    actions: {
      read: true,
      update: true,
    },
  },
  clientDocument: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  companyExpense: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  incidentReport: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  maintenanceLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  progressReport: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  temperatureLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  bloodGlucoseLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientBehaviour: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  bloodPressureLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  staffDocumentType: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientDocumentType: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  conflictOfInterest: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  leaseAndUtilityLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  oxygenSaturationLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  expenseReimbursement: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  staffDocumentCategory: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  staffSleepDisturbance: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  clientDocumentCategory: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  restrictivePracticeLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
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
          name: "Role 1",
          permissions: JSON.stringify(permissions),
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          name: "Role 2",
          permissions: JSON.stringify(permissions),
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
          reset_password_token:
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
          first_name: "Yasmine",
          last_name: "Sidhu",
          preferred_name: "Yasmine",
          email: "yasmine@carediary.com.au",
          date_of_birth: new Date(),
          personal_contact_number: "23445323",
          work_contact_number: "4345454",
          address: "23,seaton, sa",
          emergency_contact_name: "Pavi",
          emergency_contact_phone: "5454353",
          emergency_contact_relation: "Husband",
          job_title: "dcsdcd",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          employment_type: "fullTime",
          user: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "7b052282-d57e-45c0-8cef-b39c949294b5",
          first_name: "Pavi",
          last_name: "Sidhu",
          preferred_name: "Pavi",
          email: "pavi@carediary.com.au",
          date_of_birth: new Date(),
          personal_contact_number: "7867868",
          work_contact_number: "4545454",
          address: "54,seaton, sa",
          emergency_contact_name: "Yasmine",
          emergency_contact_phone: "65555",
          emergency_contact_relation: "wife",
          job_title: "455354",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          employment_type: "partTime",
          user: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
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
          id: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          first_name: "Chris",
          last_name: "Green",
          preferred_name: "Chris",
          email: "Chris@gmail.com",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          first_name: "John",
          last_name: "Wills",
          preferred_name: "John",
          email: "John@gmail.com",
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
          date: new Date(),
          shift_start_time: new Date(),
          shift_end_time: new Date(),
          notes: "Company 1 Notes",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          shift_start_time: new Date(),
          shift_end_time: new Date(),
          notes: "Company 2 Notes",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
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
          id: "541ca221-7ca8-4679-8fcd-344cb4af9678",
          user: "54a46a5f-cd9d-435e-816c-c4c0702946aa",
          role: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "blood_glucose_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: "08-12-2021",
          time: "15:20",
          reading: 9.1,
          comments: "Company 1 comments",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: "05-10-2022",
          time: "17:36",
          reading: 12.45,
          comments: "Company 2 comments",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "bowel_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          status: "Company 1 status",
          type: "Company 1 type",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          status: "Company 2 status",
          type: "Company 2 type",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "blood_pressure_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          upper: 80,
          lower: 120,
          pulse: 98,
          comments: "Company 1 comments",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          upper: 60,
          lower: 115,
          pulse: 96,
          comments: "Company 2 comments",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "temperature_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          reading: 99.1,
          comments: "Company 1 comments",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          reading: 102.45,
          comments: "Company 2 comments",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "weight_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          reading: 89.1,
          comments: "Company 1 comments",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          reading: 71.45,
          comments: "Company 2 comments",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "oxygen_saturation_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          reading: 89.1,
          probe_placement: "Somewhere company 1",
          suctioning_required: true,
          type_of_suctioning: "Somewhere company 1",
          suction_amount: "Somewhere company 1",
          secretion_description: "Somewhere company 1",
          reading_post_suctioning: 71.45,
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          reading: 71.45,
          probe_placement: "Somewhere company 2",
          suctioning_required: true,
          type_of_suctioning: "Somewhere company 2",
          suction_amount: "Somewhere company 2",
          secretion_description: "Somewhere company 2",
          reading_post_suctioning: 71.45,
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "seizure_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          seizure: "seizure company 1",
          recovery: "recovery company 1",
          comments: "comments company 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          seizure: "seizure company 1",
          recovery: "recovery company 1",
          comments: "comments company 1",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "prn_admin_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          medication: "Endone",
          dosage: "1.5 ml",
          reason: "unsettled",
          outcome: "settled",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          medication: "Targin",
          dosage: "1.5 ml",
          reason: "unsettled",
          outcome: "settled",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "prn_balance_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          name: "Endone",
          balance: 1.2,
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          name: "Targin",
          balance: 1.5,
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "client_behaviours",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          antecedents: "what_happened_before company 1",
          behaviour: "explain_behaviour company 1",
          consequences: "actions_taken company 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          antecedents: "what_happened_before company 2",
          behaviour: "explain_behaviour company 2",
          consequences: "actions_taken company 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "vehicle_logs",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          odometer_reading_start: 21000213,
          odometer_reading_end: 21000225,
          purpose_of_the_journey: "Company 1 comments",
          total_km: 12,
          vehicle: "company",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          odometer_reading_start: 21000213,
          odometer_reading_end: 21000226,
          purpose_of_the_journey: "Company 2 comments",
          total_km: 13,
          vehicle: "company",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "injury_reports",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          description: "company 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          description: "company 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "expense_reimbursements",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          total_cost: 12.4,
          description: "company 1",
          comments: "company 1",
          status: "pending",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          total_cost: 30.4,
          description: "company 2",
          comments: "company 1",
          status: "approved",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "doctor_visits",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          doctor_name: "company 1",
          health_practitioner: "dentist",
          reason_for_visit: "company 1",
          doctor_instructions: "company 1",
          location: "Seaton",
          appointment_type: "online",
          next_appointment_date: new Date(),
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          doctor_name: "company 2",
          health_practitioner: "doctor",
          reason_for_visit: "company 2",
          doctor_instructions: "company 2",
          location: "fulham",
          appointment_type: "online",
          next_appointment_date: new Date(),
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "client_assets",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          asset_name: "Company 1 asset",
          location: "Company 1 type",
          description: "Company 1 type",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          asset_name: "Company 2 asset",
          location: "Company 2 type",
          description: "Company 2 type",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "company_assets",
      [
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          asset_name: "Company 1 asset",
          location: "Company 1 type",
          description: "Company 1 type",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          asset_name: "Company 2 asset",
          location: "Company 2 type",
          description: "Company 2 type",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "repair_requests",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          problem: "company 1 problem",
          risk: "company 1 risk",
          location: "Seaton",
          priority: "high",
          status: "pending",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          problem: "company 2 problem",
          risk: "company 2 risk",
          location: "fulham",
          priority: "low",
          status: "completed",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "conflict_of_interests",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          conflict_description: "conflict description 1",
          mitigation_strategy: "mitigation strategy",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          conflict_description: "conflict description 2",
          mitigation_strategy: "mitigation strategy",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "corporate_risks",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          level_of_risk: "low",
          likelihood: "rare",
          consequences: "minimal",
          risk_description: "conflict description 1",
          mitigation_strategy: "mitigation strategy",
          monitoring_strategy: "monitoring strategy",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          level_of_risk: "low",
          likelihood: "rare",
          consequences: "minimal",
          risk_description: "conflict description 2",
          mitigation_strategy: "mitigation strategy",
          monitoring_strategy: "monitoring strategy",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    // await queryInterface.bulkInsert(
    //   "whs_logs",
    //   [
    //     {
    //       id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
    //       date: new Date(),
    //       category: "data safety sheet",
    //       location: "company 1",
    //       next_review_date: new Date(),
    //       comments: "company 1",
    //       staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
    //       company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
    //       created: new Date(),
    //       updated: new Date(),
    //     },
    //     {
    //       id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
    //       date: new Date(),
    //       category: "data safety sheet",
    //       location: "company 2",
    //       next_review_date: new Date(),
    //       comments: "company 2",
    //       staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
    //       company: "d587b3ba-69a6-4d46-a42a-113eed378310",
    //       created: new Date(),
    //       updated: new Date(),
    //     },
    //   ],
    //   {}
    // );

    await queryInterface.bulkInsert(
      "meeting_logs",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          meeting_type: "adminMeeting",
          location: "company 1",
          purpose: "purpose 1",
          attendees: "attendees 1",
          apologies: "apologies 1",
          agenda: "agenda 1",
          discussion: "discussion 1",
          action: "action 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          meeting_type: "adminMeeting",
          location: "company 2",
          purpose: "purpose 2",
          attendees: "attendees 2",
          apologies: "apologies 2",
          agenda: "agenda 2",
          discussion: "discussion 2",
          action: "action 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "client_risks",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          level_of_risk: "low",
          likelihood: "rare",
          consequences: "minimal",
          risk_description: "conflict description 1",
          mitigation_strategy: "mitigation strategy",
          monitoring_strategy: "monitoring strategy",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          level_of_risk: "low",
          likelihood: "rare",
          consequences: "minimal",
          risk_description: "conflict description 2",
          mitigation_strategy: "mitigation strategy",
          monitoring_strategy: "monitoring strategy",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "staff_sleep_disturbances",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          total_hours: 2.5,
          description: "description 1",
          actions: "actions 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          start_time: new Date(),
          end_time: new Date(),
          total_hours: 3,
          description: "description 2",
          actions: "actions 1",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "resources",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          collection_types: JSON.stringify([]),
          type: "link",
          title: "title 1",
          text: "text 1",
          link: "link 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          collection_types: JSON.stringify([]),
          type: "link",
          title: "title 2",
          text: "text 2",
          link: "link 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "attachments",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          name: "sample.pdf",
          meme: "application/pdf",
          url: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd/1642817572356-676448347-sample.pdf",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          name: "sample.pdf",
          meme: "application/pdf",
          url: "d587b3ba-69a6-4d46-a42a-113eed378310/1642817572356-676448347-sample.pdf",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "lease_and_utility_logs",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          document_name: "company 1 document",
          comments: "comments 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          client: "fcb57be9-002f-4691-92ca-b9c118fcefb3",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          document_name: "company 2 document",
          comments: "comments 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          client: "346fd1cf-ceea-4e85-b8ac-54acca970843",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "maintenance_logs",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date: new Date(),
          time: new Date(),
          subject: "subject 1",
          description: "description 1",
          location: "location 1",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date: new Date(),
          time: new Date(),
          subject: "subject 2",
          description: "description 2",
          location: "location 2",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "feedbacks",
      [
        {
          id: "37ead1de-fda9-4882-a702-2b6f7673ed8d",
          date_reported: new Date(),
          name: "feedback 1",
          email: "asc@gmail.com",
          phone: "123445",
          you_are_a: "family",
          type_of_feedback: "compliment",
          feedback: "compliment",
          assessments: "compliment",
          actions: "compliment",
          notified_of_result: "compliment",
          date_closed: new Date(),
          status: "awaitingAcknowledgement",
          staff: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "204f3598-960b-4c53-be9c-bd8e89ff917d",
          date_reported: new Date(),
          name: "feedback 2",
          email: "asc@gmail.com",
          phone: "123445",
          you_are_a: "family",
          type_of_feedback: "complaint",
          feedback: "complaint",
          assessments: "complaint",
          actions: "complaint",
          notified_of_result: "complaint",
          date_closed: new Date(),
          status: "acknowledged",
          staff: "7b052282-d57e-45c0-8cef-b39c949294b5",
          company: "d587b3ba-69a6-4d46-a42a-113eed378310",
          created: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("feedbacks", null, {});
    await queryInterface.bulkDelete("maintenance_logs", null, {});
    await queryInterface.bulkDelete("lease_and_utility_logs", null, {});
    await queryInterface.bulkDelete("attachments", null, {});
    await queryInterface.bulkDelete("resources", null, {});
    await queryInterface.bulkDelete("staff_sleep_disturbances", null, {});
    await queryInterface.bulkDelete("client_risks", null, {});
    await queryInterface.bulkDelete("meeting_logs", null, {});
    // await queryInterface.bulkDelete("whs_logs", null, {});
    await queryInterface.bulkDelete("corporate_risks", null, {});
    await queryInterface.bulkDelete("conflict_of_interests", null, {});
    await queryInterface.bulkDelete("repair_requests", null, {});
    await queryInterface.bulkDelete("company_assets", null, {});
    await queryInterface.bulkDelete("client_assets", null, {});
    await queryInterface.bulkDelete("doctor_visits", null, {});
    await queryInterface.bulkDelete("expense_reimbursements", null, {});
    await queryInterface.bulkDelete("injury_reports", null, {});
    await queryInterface.bulkDelete("vehicle_logs", null, {});
    // await queryInterface.bulkDelete("transport_behaviours", null, {});
    await queryInterface.bulkDelete("client_behaviours", null, {});
    await queryInterface.bulkDelete("prn_balance_logs", null, {});
    await queryInterface.bulkDelete("prn_admin_logs", null, {});
    await queryInterface.bulkDelete("seizure_logs", null, {});
    await queryInterface.bulkDelete("oxygen_saturation_logs", null, {});
    await queryInterface.bulkDelete("weight_logs", null, {});
    await queryInterface.bulkDelete("temperature_logs", null, {});
    await queryInterface.bulkDelete("blood_pressure_logs", null, {});
    await queryInterface.bulkDelete("bowel_logs", null, {});
    await queryInterface.bulkDelete("blood_glucose_logs", null, {});
    await queryInterface.bulkDelete("users_roles", null, {});
    await queryInterface.bulkDelete("progress_notes", null, {});
    await queryInterface.bulkDelete("client_profiles", null, {});
    await queryInterface.bulkDelete("staff_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("companies", null, {});
  },
};
