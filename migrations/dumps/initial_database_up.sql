-- 1. Create companies table
CREATE TABLE IF NOT EXISTS "companies" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "address" VARCHAR,
    "attachment" UUID,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;

-- 2. Create roles table
CREATE TABLE IF NOT EXISTS "roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "permissions" JSONB,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "roles" ENABLE ROW LEVEL SECURITY;

-- 3. Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "reset_password_token" VARCHAR,
    "blocked" BOOLEAN NOT NULL DEFAULT FALSE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- 4. Create enum_gender type
CREATE TYPE "enum_gender" AS ENUM ('female', 'male', 'other');

-- 5. Create staff_profiles table
CREATE TABLE IF NOT EXISTS "staff_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "preferred_name" VARCHAR NOT NULL,
    "attachment" UUID,
    "email" VARCHAR NOT NULL,
    "gender" enum_gender,
    "date_of_birth" TIMESTAMP WITH TIME ZONE,
    "personal_contact_number" VARCHAR,
    "work_contact_number" VARCHAR,
    "address" VARCHAR,
    "emergency_contact_name" VARCHAR,
    "emergency_contact_phone" VARCHAR,
    "emergency_contact_relation" VARCHAR,
    "job_title" VARCHAR,
    "employment_start_date" TIMESTAMP WITH TIME ZONE,
    "employment_end_date" TIMESTAMP WITH TIME ZONE,
    "employment_type" VARCHAR,
    "archived" BOOLEAN NOT NULL DEFAULT FALSE,
    "manager" UUID REFERENCES "staff_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "user" UUID REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_profiles" ENABLE ROW LEVEL SECURITY;

-- 6. Create client_profiles table & enum_funding_type type
CREATE TYPE "enum_funding_type" AS ENUM ('ndisManaged', 'planManaged','selfManaged');
CREATE TABLE IF NOT EXISTS "client_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "preferred_name" VARCHAR NOT NULL,
    "attachment" UUID,
    "email" VARCHAR,
    "gender" enum_gender,
    "date_of_birth" DATE,
    "address" VARCHAR,
    "emergency_contact_name" VARCHAR,
    "emergency_contact_phone" VARCHAR,
    "emergency_contact_relation" VARCHAR,
    "height" INTEGER,
    "funding_type" enum_funding_type,
    "ndis_number" VARCHAR,
    "medicare_number" VARCHAR,
    "private_healthcare_number" VARCHAR,
    "ambulance_number" VARCHAR,
    "service_start_date" TIMESTAMP WITH TIME ZONE,
    "service_end_date" TIMESTAMP WITH TIME ZONE,
    "archived" BOOLEAN NOT NULL DEFAULT FALSE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_profiles" ENABLE ROW LEVEL SECURITY;

-- 7. Create progress_notes table
CREATE TABLE IF NOT EXISTS "progress_notes" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "shift_start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "shift_end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "notes" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "progress_notes" ENABLE ROW LEVEL SECURITY;

-- 8. Create users_roles table
CREATE TABLE IF NOT EXISTS "users_roles" (
    "id" UUID NOT NULL,
    "user" UUID NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "role" UUID NOT NULL REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "users_roles" ENABLE ROW LEVEL SECURITY;

-- 9. Create blood_glucose_logs table
CREATE TABLE IF NOT EXISTS "blood_glucose_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "blood_glucose_logs" ENABLE ROW LEVEL SECURITY;

-- 10. Create bowel_logs table
CREATE TABLE IF NOT EXISTS "bowel_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "status" VARCHAR NOT NULL,
    "type" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "bowel_logs" ENABLE ROW LEVEL SECURITY;

-- 11. Create blood_pressure_logs table
CREATE TABLE IF NOT EXISTS "blood_pressure_logs"(
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "upper" INTEGER NOT NULL,
    "lower" INTEGER NOT NULL,
    "pulse" INTEGER NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "blood_pressure_logs" ENABLE ROW LEVEL SECURITY;


-- 12. Create enum_sleep_activity type 
-- CREATE TYPE "enum_sleep_activity" AS ENUM ('awake', 'sleep');

 -- 13. Create sleep_logs table
-- CREATE TABLE IF NOT EXISTS "sleep_logs"(
--     "id" UUID NOT NULL,
--     "date" TIMESTAMP WITH TIME ZONE NOT NULL,
--     "time" TIME WITHOUT TIME ZONE NOT NULL,
--     "activity" enum_sleep_activity NOT NULL,
--     "comments" VARCHAR,
--     "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--     "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--     "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
--     "created" TIMESTAMP WITH TIME ZONE NOT NULL,
--     "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
--     "deleted" TIMESTAMP WITH TIME ZONE,
--     PRIMARY KEY ("id")
-- );
-- ALTER TABLE "sleep_logs" ENABLE ROW LEVEL SECURITY;

-- 14. Create temperature_logs table
CREATE TABLE IF NOT EXISTS "temperature_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "temperature_logs" ENABLE ROW LEVEL SECURITY;

-- 15. Create weight_logs table
CREATE TABLE IF NOT EXISTS "weight_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "weight_logs" ENABLE ROW LEVEL SECURITY;

-- 16. Create oxygen_saturation_logs table
CREATE TABLE IF NOT EXISTS "oxygen_saturation_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL,
    "probe_placement" VARCHAR NOT NULL,
    "suctioning_required" BOOLEAN NOT NULL,
    "type_of_suctioning" VARCHAR,
    "suction_amount" VARCHAR,
    "secretion_description" VARCHAR,
    "reading_post_suctioning" DOUBLE PRECISION,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "oxygen_saturation_logs" ENABLE ROW LEVEL SECURITY;

-- 17. Create seizure_logs table
CREATE TABLE IF NOT EXISTS "seizure_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "seizure" VARCHAR NOT NULL,
    "recovery" VARCHAR NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "seizure_logs" ENABLE ROW LEVEL SECURITY;

-- 18. Create prn_admin_logs table
CREATE TABLE IF NOT EXISTS "prn_admin_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "medication" VARCHAR NOT NULL,
    "dosage" VARCHAR NOT NULL,
    "reason" VARCHAR NOT NULL,
    "outcome" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "prn_admin_logs" ENABLE ROW LEVEL SECURITY;

-- 19. Create prn_balance_logs table
CREATE TABLE IF NOT EXISTS "prn_balance_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "name" VARCHAR NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "prn_balance_logs" ENABLE ROW LEVEL SECURITY;

-- 20. Create client_behaviours table
CREATE TABLE IF NOT EXISTS "client_behaviours" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time"  TIME WITHOUT TIME ZONE NOT NULL,
    "antecedents" VARCHAR NOT NULL,
    "behaviour" VARCHAR NOT NULL,
    "consequences" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_behaviours" ENABLE ROW LEVEL SECURITY;

-- 21. Transport behaviour logs deleted

-- 22. Create enum_vehicle type
CREATE TYPE "enum_vehicle" AS ENUM ('company', 'private', 'other');

-- 23. Create vehicle_logs table
CREATE TABLE IF NOT EXISTS "vehicle_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "odometer_reading_start" BIGINT NOT NULL,
    "odometer_reading_end" BIGINT NOT NULL,
    "purpose_of_the_journey" VARCHAR NOT NULL,
    "total_km" DOUBLE PRECISION NOT NULL,
    "vehicle" enum_vehicle NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "vehicle_logs" ENABLE ROW LEVEL SECURITY;

-- 24. Create injury_reports table
CREATE TABLE IF NOT EXISTS "injury_reports" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "description" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "injury_reports" ENABLE ROW LEVEL SECURITY;

-- 25. Create enum_expense_reimbursement_status type
CREATE TYPE "enum_expense_reimbursement_status" AS ENUM ('approved', 'pending', 'rejected');

-- 26. Create expense_reimbursements table
CREATE TABLE IF NOT EXISTS "expense_reimbursements" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "comments" VARCHAR ,
    "status" enum_expense_reimbursement_status NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "expense_reimbursements" ENABLE ROW LEVEL SECURITY;

-- 27. Create enum_health_practitioner type
CREATE TYPE "enum_health_practitioner" AS ENUM ('behaviourTherapist', 'continence', 'dentist', 'dietician', 'doctor', 'nurse', 'occupationalTherapist', 'other', 'physiotherapist', 'podiatrist', 'psychologist', 'speechPathologist');

-- 28. Create enum_appointment_type type
CREATE TYPE "enum_appointment_type" AS ENUM ('inPerson', 'online','overThePhone');

-- 29. Create doctor_visits table
CREATE TABLE IF NOT EXISTS "doctor_visits" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "doctor_name" VARCHAR NOT NULL,
    "health_practitioner" enum_health_practitioner NOT NULL,
    "reason_for_visit" VARCHAR NOT NULL ,
    "doctor_instructions" VARCHAR NOT NULL ,
    "location" VARCHAR ,
    "appointment_type" enum_appointment_type ,
    "next_appointment_date" TIMESTAMP WITH TIME ZONE,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "doctor_visits" ENABLE ROW LEVEL SECURITY;

-- 30. Create client_assets table
CREATE TABLE IF NOT EXISTS "client_assets" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "asset_name" VARCHAR NOT NULL,
    "location" VARCHAR NOT NULL,
    "description" VARCHAR ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_assets" ENABLE ROW LEVEL SECURITY;

-- 31. Create company_assets table
CREATE TABLE IF NOT EXISTS "company_assets" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "asset_name" VARCHAR NOT NULL,
    "location" VARCHAR NOT NULL,
    "description" VARCHAR ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "company_assets" ENABLE ROW LEVEL SECURITY;

-- 32. Create enum_repair_requests_priority type
CREATE TYPE "enum_repair_requests_priority" AS ENUM ('high', 'low', 'medium');

-- 33. Create enum_repair_requests_status type
CREATE TYPE "enum_repair_requests_status" AS ENUM ('completed', 'pending', 'rejected', 'scheduled');

-- 34. Create repair_requests table
CREATE TABLE IF NOT EXISTS "repair_requests" (
    "id" UUID NOT NULL,
    "problem" VARCHAR NOT NULL,
    "risk" VARCHAR NOT NULL,
    "location" VARCHAR NOT NULL ,
    "priority" enum_repair_requests_priority NOT NULL,
    "status" enum_repair_requests_status NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "repair_requests" ENABLE ROW LEVEL SECURITY;

-- 35. Create conflict_of_interests table
CREATE TABLE IF NOT EXISTS "conflict_of_interests" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "conflict_description" VARCHAR NOT NULL,
    "mitigation_strategy" VARCHAR NOT NULL ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "conflict_of_interests" ENABLE ROW LEVEL SECURITY;

-- 36. Create enum_corporate_risks_level_of_risk type
CREATE TYPE "enum_corporate_risks_level_of_risk" AS ENUM ('high', 'low', 'medium');

-- 37. Create enum_corporate_risks_likelihood type
CREATE TYPE "enum_corporate_risks_likelihood" AS ENUM ('almostCertain', 'likely', 'possible', 'rare', 'unlikely');

-- 38. Create enum_corporate_risks_consequences type
CREATE TYPE "enum_corporate_risks_consequences" AS ENUM ('minimal', 'minor', 'moderate', 'severe', 'significant');

-- 39. Create corporate_risks table
CREATE TABLE IF NOT EXISTS "corporate_risks" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "level_of_risk" enum_corporate_risks_level_of_risk NOT NULL,
    "likelihood" enum_corporate_risks_likelihood NOT NULL,
    "consequences" enum_corporate_risks_consequences NOT NULL,
    "risk_description" VARCHAR NOT NULL,
    "mitigation_strategy" VARCHAR NOT NULL ,
    "monitoring_strategy" VARCHAR NOT NULL ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "corporate_risks" ENABLE ROW LEVEL SECURITY;

-- 40. Create whs_logs table
CREATE TABLE IF NOT EXISTS "whs_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "category" VARCHAR NOT NULL,
    "location" VARCHAR ,
    "next_review_date" TIMESTAMP WITH TIME ZONE,
    "comments" VARCHAR ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "whs_logs" ENABLE ROW LEVEL SECURITY;

-- 41. Create enum_meeting_type type
CREATE TYPE "enum_meeting_type" AS ENUM ('adminMeeting', 'clientMeeting', 'externalMeeting', 'staffMeeting');

-- 42. Create meeting_logs table
CREATE TABLE IF NOT EXISTS "meeting_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time"  TIME WITHOUT TIME ZONE NOT NULL,
    "meeting_type" enum_meeting_type NOT NULL,
    "location" VARCHAR NOT NULL,
    "purpose" VARCHAR NOT NULL, 
    "attendees" VARCHAR  NOT NULL,
    "apologies" VARCHAR NOT NULL,
    "agenda" VARCHAR NOT NULL,
    "discussion" VARCHAR NOT NULL, 
    "action" VARCHAR NOT NULL, 
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "meeting_logs" ENABLE ROW LEVEL SECURITY;

-- 43. Create enum_client_risks_level_of_risk type
CREATE TYPE "enum_client_risks_level_of_risk" AS ENUM ('high', 'low', 'medium');

-- 44. Create enum_client_risks_likelihood type
CREATE TYPE "enum_client_risks_likelihood" AS ENUM ('almostCertain', 'likely', 'possible', 'rare', 'unlikely');

-- 45. Create enum_client_risks_consequences type
CREATE TYPE "enum_client_risks_consequences" AS ENUM ('minimal', 'minor', 'moderate', 'severe', 'significant');

-- 46. Create client_risks table
CREATE TABLE IF NOT EXISTS "client_risks" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "level_of_risk" enum_client_risks_level_of_risk NOT NULL,
    "likelihood" enum_client_risks_likelihood NOT NULL,
    "consequences" enum_client_risks_consequences NOT NULL,
    "risk_description" VARCHAR NOT NULL,
    "mitigation_strategy" VARCHAR NOT NULL ,
    "monitoring_strategy" VARCHAR NOT NULL ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_risks" ENABLE ROW LEVEL SECURITY;

-- 47. Create staff_sleep_disturbances table
CREATE TABLE IF NOT EXISTS "staff_sleep_disturbances" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "total_hours" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR NOT NULL,
    "actions" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_sleep_disturbances" ENABLE ROW LEVEL SECURITY;

-- 48. Create enum_resources_type type
CREATE TYPE "enum_resources_type" AS ENUM ('attachment', 'link', 'text');

-- 49. Create resources table
CREATE TABLE IF NOT EXISTS "resources" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "collection_types" JSONB ,
    "type" enum_resources_type NOT NULL,
    "title" VARCHAR NOT NULL,
    "text" VARCHAR ,
    "link" VARCHAR ,
    "attachment" UUID,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "resources" ENABLE ROW LEVEL SECURITY;

-- 50. Create attachments table
CREATE TABLE IF NOT EXISTS "attachments" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "meme" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "attachments" ENABLE ROW LEVEL SECURITY;

-- 51. Create lease_and_utility_logs table
CREATE TABLE IF NOT EXISTS "lease_and_utility_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "document_name" VARCHAR NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID REFERENCES "client_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "lease_and_utility_logs" ENABLE ROW LEVEL SECURITY;

-- 52. Create  maintenance_logs table
CREATE TABLE IF NOT EXISTS "maintenance_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "subject" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "location" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "maintenance_logs" ENABLE ROW LEVEL SECURITY;

-- 53. Create enum_feedback_you_are_a type
CREATE TYPE "enum_feedback_you_are_a" AS ENUM ('family', 'other', 'participant', 'staff', 'supportCoordinator');

-- 54. Create enum_type_of_feedback type
CREATE TYPE "enum_type_of_feedback" AS ENUM ('complaint', 'compliment', 'feedback');

-- 55. Create enum_feedback_status type
CREATE TYPE "enum_feedback_status" AS ENUM ('acknowledged', 'assessed', 'awaitingAcknowledgement', 'resolved');

-- 56. Create  feedbacks table
CREATE TABLE IF NOT EXISTS "feedbacks" (
    "id" UUID NOT NULL,
    "date_reported" TIMESTAMP WITH TIME ZONE NOT NULL,
    "name" VARCHAR,
    "email" VARCHAR,
    "phone" VARCHAR (255),
    "you_are_a" enum_feedback_you_are_a NOT NULL,
    "type_of_feedback" enum_type_of_feedback NOT NULL,
    "feedback" VARCHAR NOT NULL,
    "assessments" VARCHAR,
    "actions" VARCHAR,
    "notified_of_result" VARCHAR,
    "date_closed" TIMESTAMP WITH TIME ZONE,
    "status" enum_feedback_status,
    "staff" UUID REFERENCES "staff_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "feedbacks" ENABLE ROW LEVEL SECURITY;

-- 57. Add attachment to companies table
ALTER TABLE "companies" ADD CONSTRAINT "fk_companies_attachments" 
FOREIGN KEY ("attachment") REFERENCES "attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 58. Create injury_reports_attachments table
CREATE TABLE IF NOT EXISTS "injury_reports_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "injury_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "injury_reports_attachments" ENABLE ROW LEVEL SECURITY;

-- 59. Create maintenance_logs_attachments table
CREATE TABLE IF NOT EXISTS "maintenance_logs_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "maintenance_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "maintenance_logs_attachments" ENABLE ROW LEVEL SECURITY;

-- 60. Create lease_and_utility_logs_attachments table
CREATE TABLE IF NOT EXISTS "lease_and_utility_logs_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "lease_and_utility_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "lease_and_utility_logs_attachments" ENABLE ROW LEVEL SECURITY;

-- 61. Create repair_requests_attachments table
CREATE TABLE IF NOT EXISTS "repair_requests_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "repair_requests" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "repair_requests_attachments" ENABLE ROW LEVEL SECURITY;

-- 62. Create client_document_categories table
CREATE TABLE IF NOT EXISTS "client_document_categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_document_categories" ENABLE ROW LEVEL SECURITY;

-- 63. Create client_document_types table
CREATE TABLE IF NOT EXISTS "client_document_types" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "category" UUID NOT NULL REFERENCES "client_document_categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_document_types" ENABLE ROW LEVEL SECURITY;

-- 64. Create client_documents table
CREATE TABLE IF NOT EXISTS "client_documents" (
    "id" UUID NOT NULL,
    "comments" VARCHAR,
    "has_expiry" BOOLEAN NOT NULL DEFAULT FALSE,
    "expiry_date" TIMESTAMP WITH TIME ZONE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "category" UUID NOT NULL REFERENCES "client_document_categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "type" UUID NOT NULL REFERENCES "client_document_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_documents" ENABLE ROW LEVEL SECURITY;

-- 65. Create client_documents_attachments table
CREATE TABLE IF NOT EXISTS "client_documents_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "client_documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_documents_attachments" ENABLE ROW LEVEL SECURITY;

-- 66. Create staff_document_categories table
CREATE TABLE IF NOT EXISTS "staff_document_categories" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_document_categories" ENABLE ROW LEVEL SECURITY;

-- 67. Create staff_document_types table
CREATE TABLE IF NOT EXISTS "staff_document_types" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "category" UUID NOT NULL REFERENCES "staff_document_categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_document_types" ENABLE ROW LEVEL SECURITY;

-- 68. Create staff_documents table
CREATE TABLE IF NOT EXISTS "staff_documents" (
    "id" UUID NOT NULL,
    "comments" VARCHAR,
    "has_expiry" BOOLEAN NOT NULL DEFAULT FALSE,
    "expiry_date" TIMESTAMP WITH TIME ZONE,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "category" UUID NOT NULL REFERENCES "staff_document_categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "type" UUID NOT NULL REFERENCES "staff_document_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_documents" ENABLE ROW LEVEL SECURITY;

-- 69. Create staff_documents_attachments table
CREATE TABLE IF NOT EXISTS "staff_documents_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "staff_documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_documents_attachments" ENABLE ROW LEVEL SECURITY;

-- 70. Create whs_logs_attachments table
CREATE TABLE IF NOT EXISTS "whs_logs_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "whs_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "whs_logs_attachments" ENABLE ROW LEVEL SECURITY;

-- 71. Create incident_types table
CREATE TABLE IF NOT EXISTS "incident_types" (
  "id" UUID NOT NULL,
  "type" VARCHAR NOT NULL,
  "is_reportable" BOOLEAN NOT NULL DEFAULT FALSE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_types" ENABLE ROW LEVEL SECURITY;
INSERT INTO incident_types VALUES
    ('2ba3703f-1c03-432e-852f-5b9e967bbc09', 'Death of a participant', true, now(), now()),
    ('05c98255-d3a8-4402-90ec-9625875b5d33', 'Serious injury of a participant', true, now(), now()),
    ('9015cb7c-3a7d-430f-821b-31f2abbdd502', 'Abuse or Neglect of a participant', true, now(), now()),
    ('88569c7a-ba80-4e36-b186-5eb8de91ed85', 'Unlawful sexual or physical contact of a participant', true, now(), now()),
    ('d1569bd4-81d8-43fe-967d-1559b2a604ce', 'Sexual misconduct', true, now(), now()),
    ('1c10efe5-e02e-445c-b739-54463d4c9068', 'Unauthorised use of restrictive practice', true, now(), now()),
    ('f21ea46f-fb78-4b14-9300-014689cccaf6', 'Sexual misconduct', false, now(), now()),
    ('e32bcc33-1052-4628-812b-90b8ad57238c', 'Abuse or Neglect of a participant', false, now(), now()),
    ('bc408418-4bdb-46aa-9259-a46432bbb2a7', 'Aggression physical', false, now(), now()),
    ('e73ea0cc-87f9-4ed1-9326-67b741c963b1', 'Aggression verbal', false, now(), now()),
    ('c8db8090-b944-4309-8d75-b98dd8deb4ea', 'Confidentiality breach', false, now(), now()),
    ('29f979bb-42f6-45ed-adbd-b3f1a0391c0a', 'Conflict with staff, participant or other', false, now(), now()),
    ('77bd0cbc-5fb4-455d-a4d2-59fe199b7850', 'Participant under the influence of drug', false, now(), now()),
    ('9db366ef-0d1c-42c6-8c8a-aa98de9f23b4', 'Damage to property', false, now(), now()),
    ('51264221-42ec-401d-8234-a8c71864af3f', 'Hazard', false, now(), now()),
    ('66a2b5b6-4d5c-448a-88b8-cd998a36e117', 'Minor injury', false, now(), now()),
    ('1281fc21-6898-46b8-b1f5-62557dba69aa', 'Missing or Absconded MPR lodged', false, now(), now()),
    ('71514a52-4218-4696-a2b6-1da33fcb4da8', 'Medication error by staff', false, now(), now()),
    ('e33294c0-4ab3-4ad8-b90f-16004355c6b1', 'Medication refusal by participant', false, now(), now()),
    ('9ed9920c-d03a-4df7-a978-7139d2c77e57', 'Motor vehicle incident', false, now(), now()),
    ('5486bcea-6b80-43b7-99af-e4cbc1d081a6', 'Near miss incident', false, now(), now()),
    ('22df1342-e010-4f10-aea8-ebba2588c424', 'Unsafe behaviour', false, now(), now()),
	('9781d6b4-6f6c-4041-a0eb-cb9e301d3e80', 'Other', false, now(), now());

-- 72. Create incident_reports table
CREATE TABLE IF NOT EXISTS "incident_reports" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "location" VARCHAR NOT NULL,
    "incident_description" VARCHAR NOT NULL,
    "events_prior_to_incident" VARCHAR NOT NULL,
    "actions_taken_by_staff" VARCHAR NOT NULL,
    "actions_taken_by_others" VARCHAR NOT NULL,
    "any_other_witness" VARCHAR NOT NULL,
    "incident_reported_to" VARCHAR,
    "assessment_and_debriefing" VARCHAR,
    "findings_and_actions_taken" VARCHAR,
    "status" VARCHAR,
    "closure_date" TIMESTAMP WITH TIME ZONE,
    "manager" UUID REFERENCES "staff_profiles" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports" ENABLE ROW LEVEL SECURITY;

-- 73. Create incident_reports_staff_profiles table
CREATE TABLE IF NOT EXISTS "incident_reports_staff_profiles" (
  "id" UUID NOT NULL,
  "incident" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_staff_profiles" ENABLE ROW LEVEL SECURITY;

-- 74. Create incident_reports_incident_types table
CREATE TABLE IF NOT EXISTS "incident_reports_incident_types" (
  "id" UUID NOT NULL,
  "incident" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "type" UUID NOT NULL REFERENCES "incident_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_incident_types" ENABLE ROW LEVEL SECURITY;

-- 75. Create incident_reports_attachments table
CREATE TABLE IF NOT EXISTS "incident_reports_attachments" (
    "id" UUID NOT NULL,
    "relation" UUID NOT NULL REFERENCES "incident_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "incident_reports_attachments" ENABLE ROW LEVEL SECURITY;

-- 76. Create key_decisions table
CREATE TABLE IF NOT EXISTS "key_decisions" (
  "id" UUID NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "description" VARCHAR NOT NULL,
  "decision_rationale" VARCHAR NOT NULL,
  "alternatives_considered" VARCHAR,
  "cost_implications" VARCHAR,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "key_decisions" ENABLE ROW LEVEL SECURITY;

-- 77. Create restrictive_practice_logs table
CREATE TABLE IF NOT EXISTS "restrictive_practice_logs" (
  "id" UUID NOT NULL,
  "is_authorised" VARCHAR NOT NULL,
  "type" VARCHAR (255) NOT NULL,
  "impact_on_any_person" VARCHAR NOT NULL,
  "injury_to_any_person" VARCHAR NOT NULL,
  "was_reportable_incident" VARCHAR NOT NULL,
  "reason_behind_use" VARCHAR NOT NULL,
  "describe_behaviour" VARCHAR NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "start_time" TIME WITHOUT TIME ZONE NOT NULL,
  "start_location" VARCHAR (255) NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_time" TIME WITHOUT TIME ZONE NOT NULL,
  "end_location" VARCHAR (255) NOT NULL,
  "any_witness" VARCHAR (255) NOT NULL,
  "action_taken_in_response" VARCHAR NOT NULL,
  "alternatives_considered" VARCHAR NOT NULL,
  "action_taken_leading_up_to" VARCHAR NOT NULL,
  "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs" ENABLE ROW LEVEL SECURITY;

-- 78. Create restrictive_practice_logs_staff_profiles table
CREATE TABLE IF NOT EXISTS "restrictive_practice_logs_staff_profiles" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "restrictive_practice_logs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "restrictive_practice_logs_staff_profiles" ENABLE ROW LEVEL SECURITY;

-- 79. Create expense_reimbursements_attachments table
CREATE TABLE IF NOT EXISTS "expense_reimbursements_attachments" (
  "id" UUID NOT NULL,
  "relation" UUID NOT NULL REFERENCES "expense_reimbursements" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "attachment" UUID NOT NULL REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "created" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
  "deleted" TIMESTAMP WITH TIME ZONE,
  PRIMARY KEY ("id")
);
ALTER TABLE "expense_reimbursements_attachments" ENABLE ROW LEVEL SECURITY;