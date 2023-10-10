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
  site: {
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
  roster: {
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
  expense: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  invoice: {
    actions: {
      read: true,
      update: true,
    },
  },
  process: {
    actions: {
      read: true,
      create: true,
      delete: true,
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
  template: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  onCallLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  timesheet: {
    actions: {
      read: true,
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
  practiceGuide: {
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
  rosterSetting: {
    actions: {
      read: true,
      update: true,
    },
  },
  rpdhsResource: {
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
  participantGoal: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  serviceDelivery: {
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
  internalRegister: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  leadershipMeeting: {
    actions: {
      read: true,
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
  legislationRegister: {
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
  staffSupervisionLog: {
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
  progressNoteSettings: {
    actions: {
      read: true,
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
  participantMedicationChart: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  participantCommunicationLog: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  restrictivePracticeRegister: {
    actions: {
      read: true,
      create: true,
      delete: true,
      update: true,
    },
  },
  participantConfidentialDocument: {
    actions: {
      read: true,
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
          permissions: JSON.stringify(permissions),
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "88316c9b-e3ca-4e83-a6cd-3df7b95837b3",
          name: "Super Admin",
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
          first_name: "Riya",
          last_name: "Savant",
          email: "riya@gmail.com",
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
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "staff_profiles",
      [
        {
          id: "1b89e290-f53c-4ce7-ad3e-5c54a94adb9a",
          first_name: "Riya",
          last_name: "Savant",
          preferred_name: "Riya",
          email: "riya@gmail.com",
          date_of_birth: new Date(),
          personal_contact_number: "23445323",
          address: "23,seaton, sa",
          job_title: "dcsdcd",
          employment_start_date: new Date(),
          employment_end_date: new Date(),
          user: "fba6e9df-750f-4023-8dc0-d931e444f9e6",
          company: "a10a18e1-c4ca-44ca-9065-7b23ad84e3bd",
          created: new Date(),
          updated: new Date(),
        },
        {
          id: "7b052282-d57e-45c0-8cef-b39c949294b5",
          first_name: "Gaurav",
          last_name: "Bhandal",
          preferred_name: "Pavi",
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
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("attachments", null, {});
    await queryInterface.bulkDelete("users_roles", null, {});
    await queryInterface.bulkDelete("staff_profiles", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("companies", null, {});
  },
};
