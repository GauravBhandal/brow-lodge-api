-- 1. Create companies table
CREATE TABLE IF NOT EXISTS "companies" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "address" VARCHAR(255),
    "attachment" UUID,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 2. Create roles table
CREATE TABLE IF NOT EXISTS "roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "permissions" JSONB,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 3. Create users table
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "reset_password_token" VARCHAR(255),
    "blocked" BOOLEAN NOT NULL DEFAULT FALSE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 4. Create staff_profiles table
CREATE TABLE IF NOT EXISTS "staff_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "preferred_name" VARCHAR(255) NOT NULL,
    "user" UUID REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 5. Create enum_gender type
CREATE TYPE "enum_gender" AS ENUM ('male', 'female', 'other');

-- 6. Create client_profiles table
CREATE TABLE IF NOT EXISTS "client_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "preferred_name" VARCHAR(255) NOT NULL,
    "gender" enum_gender,
    "date_of_birth" DATE,
    "address" VARCHAR(255),
    "emergency_contact_name" VARCHAR(255),
    "emergency_contact_phone" VARCHAR(255),
    "emergency_contact_relation" VARCHAR(255),
    "height" INTEGER,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 7. Create progress_notes table
CREATE TABLE IF NOT EXISTS "progress_notes" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "shift_start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "shift_end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "notes" VARCHAR NOT NULL,
    "diet_and_fluids" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

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

-- 10. Create bowel_logs table
CREATE TABLE IF NOT EXISTS "bowel_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255),
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

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

-- 12. Create enum_sleep_activity type
CREATE TYPE "enum_sleep_activity" AS ENUM ('sleep', 'awake');

-- 13. Create sleep_logs table
CREATE TABLE IF NOT EXISTS "sleep_logs"(
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "activity" enum_sleep_activity NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

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

-- 16. Create oxygen_saturation_logs table
CREATE TABLE IF NOT EXISTS "oxygen_saturation_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "reading" DOUBLE PRECISION NOT NULL,
    "probe_placement" VARCHAR(255) NOT NULL,
    "suctioning_required" BOOLEAN NOT NULL,
    "type_of_suctioning" VARCHAR(255),
    "suction_amount" VARCHAR(255),
    "secretion_description" VARCHAR(255),
    "reading_post_suctioning" DOUBLE PRECISION,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

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

-- 18. Create prn_admin_logs table
CREATE TABLE IF NOT EXISTS "prn_admin_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "medication" VARCHAR(255) NOT NULL,
    "dosage" VARCHAR(255) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "outcome" VARCHAR(255) NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 19. Create prn_balance_logs table
CREATE TABLE IF NOT EXISTS "prn_balance_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 20. Create client_behaviours table
CREATE TABLE IF NOT EXISTS "client_behaviours" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time"  TIME WITHOUT TIME ZONE NOT NULL,
    "what_happened_before" VARCHAR NOT NULL,
    "explain_behaviour" VARCHAR NOT NULL,
    "actions_taken" VARCHAR NOT NULL,
    "response_to_actions" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 21. Create transport_behaviours table
CREATE TABLE IF NOT EXISTS "transport_behaviours" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "purpose_of_the_journey" VARCHAR NOT NULL,
    "explain_behaviour" VARCHAR NOT NULL,
    "actions_taken" VARCHAR NOT NULL,
    "response_to_actions" VARCHAR NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 22. Create enum_vehicle type
CREATE TYPE "enum_vehicle" AS ENUM ('private', 'company','other');


-- 23. Create vehicle_logs table
CREATE TABLE IF NOT EXISTS "vehicle_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME WITHOUT TIME ZONE NOT NULL,
    "odometer_reading_start" BIGINT NOT NULL,
    "odometer_reading_end" BIGINT NOT NULL,
    "purpose_of_the_journey" VARCHAR(255) NOT NULL,
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

-- 24. Create injury_reports table
CREATE TABLE IF NOT EXISTS "injury_reports" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 25. Create enum_expense_reimbursement_status type
CREATE TYPE "enum_expense_reimbursement_status" AS ENUM ('approved', 'pending','rejected');

-- 26. Create expense_reimbursements table
CREATE TABLE IF NOT EXISTS "expense_reimbursements" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "comments" VARCHAR(255) ,
    "status" enum_expense_reimbursement_status NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 27. Create enum_health_practitioner type
CREATE TYPE "enum_health_practitioner" AS ENUM ('behaviourTherapist', 'continence','dentist', 'dietician','doctor','nurse','occupationalTherapist','physiotherapist','podiatrist','psychologist','speechPathologist','other');

-- 28. Create enum_appointment_type type
CREATE TYPE "enum_appointment_type" AS ENUM ('inPerson', 'online','overThePhone');

-- 29. Create doctor_visits table
CREATE TABLE IF NOT EXISTS "doctor_visits" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "doctor_name" VARCHAR(255) NOT NULL,
    "health_practitioner" enum_health_practitioner NOT NULL,
    "reason_for_visit" VARCHAR(255) NOT NULL ,
    "doctor_instructions" VARCHAR(255) NOT NULL ,
    "location" VARCHAR(255) ,
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

-- 30. Create client_assets table
CREATE TABLE IF NOT EXISTS "client_assets" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "asset_name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 31. Create company_assets table
CREATE TABLE IF NOT EXISTS "company_assets" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "asset_name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 32. Create enum_repair_requests_priority type
CREATE TYPE "enum_repair_requests_priority" AS ENUM ('low', 'medium','high');

-- 33. Create enum_repair_requests_status type
CREATE TYPE "enum_repair_requests_status" AS ENUM ('completed', 'pending','rejected','scheduled');

-- 34. Create repair_requests table
CREATE TABLE IF NOT EXISTS "repair_requests" (
    "id" UUID NOT NULL,
    "problem" VARCHAR NOT NULL,
    "risk" VARCHAR NOT NULL,
    "location" VARCHAR(255) NOT NULL ,
    "priority" enum_repair_requests_priority NOT NULL,
    "status" enum_repair_requests_status NOT NULL,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 35. Create conflict_of_interests table
CREATE TABLE IF NOT EXISTS "conflict_of_interests" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "conflict_description" VARCHAR(255) NOT NULL,
    "mitigation_strategy" VARCHAR(255) NOT NULL ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 36. Create enum_corporate_risks_level_of_risk type
CREATE TYPE "enum_corporate_risks_level_of_risk" AS ENUM ('low', 'medium','high');

-- 37. Create enum_corporate_risks_likelihood type
CREATE TYPE "enum_corporate_risks_likelihood" AS ENUM ('rare', 'unlikely','possible','likely','almostCertain');

-- 38. Create enum_corporate_risks_consequences type
CREATE TYPE "enum_corporate_risks_consequences" AS ENUM ('minimal', 'minor','moderate','significant','severe');

-- 39. Create corporate_risks table
CREATE TABLE IF NOT EXISTS "corporate_risks" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "level_of_risk" enum_corporate_risks_level_of_risk NOT NULL,
    "likelihood" enum_corporate_risks_likelihood NOT NULL,
    "consequences" enum_corporate_risks_consequences NOT NULL,
    "risk_description" VARCHAR(255) NOT NULL,
    "mitigation_strategy" VARCHAR(255) NOT NULL ,
    "monitoring_strategy" VARCHAR(255) NOT NULL ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 40. Create who_logs table
CREATE TABLE IF NOT EXISTS "who_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) ,
    "next_review_date" TIMESTAMP WITH TIME ZONE,
    "comments" VARCHAR ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 41. Create enum_meeting_type type
CREATE TYPE "enum_meeting_type" AS ENUM ('clientMeeting', 'staffMeeting','externalMeeting','adminMeeting');

-- 42. Create meeting_logs table
CREATE TABLE IF NOT EXISTS "meeting_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "start_time" TIME WITHOUT TIME ZONE NOT NULL,
    "end_time"  TIME WITHOUT TIME ZONE NOT NULL,
    "meeting_type" enum_meeting_type NOT NULL,
    "location" VARCHAR(255) NOT NULL,
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

-- 43. Create enum_client_risks_level_of_risk type
CREATE TYPE "enum_client_risks_level_of_risk" AS ENUM ('low', 'medium','high');

-- 44. Create enum_client_risks_likelihood type
CREATE TYPE "enum_client_risks_likelihood" AS ENUM ('rare', 'unlikely','possible','likely','almostCertain');

-- 45. Create enum_client_risks_consequences type
CREATE TYPE "enum_client_risks_consequences" AS ENUM ('minimal', 'minor','moderate','significant','severe');

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

-- 48. Create enum_resources_type type
CREATE TYPE "enum_resources_type" AS ENUM ('text', 'link','attachment');

-- 49. Create resources table
CREATE TABLE IF NOT EXISTS "resources" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "collection_types" JSONB ,
    "type" enum_resources_type NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" VARCHAR ,
    "link" VARCHAR(255) ,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 50. Create attachments table
CREATE TABLE IF NOT EXISTS "attachments" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "meme" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 51. Create lease_and_utility_logs table
CREATE TABLE IF NOT EXISTS "lease_and_utility_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "document_name" VARCHAR(255) NOT NULL,
    "comments" VARCHAR,
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 52. Create  maintenance_logs table
CREATE TABLE IF NOT EXISTS "maintenance_logs" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "time" TIME WITHOUT TIME ZONE NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "description" VARCHAR NOT NULL,
    "location" VARCHAR(255),
    "staff" UUID NOT NULL REFERENCES "staff_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 53. Create enum_feedback_you_are_a type
CREATE TYPE "enum_feedback_you_are_a" AS ENUM ('participant', 'family','staff','supportCoordinator','other');

-- 54. Create enum_type_of_feedback type
CREATE TYPE "enum_type_of_feedback" AS ENUM ('complaint', 'compliment','feedback');

-- 55. Create enum_feedback_status type
CREATE TYPE "enum_feedback_status" AS ENUM ('awaitingAcknowledgement', 'acknowledged','assessed','resolved');

-- 56. Create  feedbacks table
CREATE TABLE IF NOT EXISTS "feedbacks" (
    "id" UUID NOT NULL,
    "date_reported" TIMESTAMP WITH TIME ZONE NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
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