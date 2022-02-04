-- 74. DROP enum_client_profile_status type
DROP TYPE "enum_client_profile_status";

-- 73. DROP enum_funding_type type
DROP TYPE "enum_funding_type";

-- 72. DROP whs_logs_attachments table
ALTER TABLE "whs_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "whs_logs_attachments";

-- 71. DROP incidents_attachments table
ALTER TABLE "incidents_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incidents_attachments";

-- 70. DROP incidents table
ALTER TABLE "incidents" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incidents";

-- 69. DROP staff_documents_attachments table
ALTER TABLE "staff_documents_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_documents_attachments";

-- 68. DROP staff_documents table
ALTER TABLE "staff_documents" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_documents";

-- 67. DROP staff_document_types table
ALTER TABLE "staff_document_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_document_types";

-- 66. DROP staff_document_categories table
ALTER TABLE "staff_document_categories" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_document_categories";

-- 65. DROP client_documents_attachments table
ALTER TABLE "client_documents_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_documents_attachments";

-- 64. DROP client_documents table
ALTER TABLE "client_documents" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_documents";

-- 63. DROP client_document_types table
ALTER TABLE "client_document_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_document_types";

-- 62. DROP client_document_categories table
ALTER TABLE "client_document_categories" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_document_categories";

-- 61. DROP repair_requests_attachments table
ALTER TABLE "repair_requests_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "repair_requests_attachments";

-- 60. DROP lease_and_utility_logs_attachments table
ALTER TABLE "lease_and_utility_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "lease_and_utility_logs_attachments";

-- 59. DROP maintenance_logs_attachments table
ALTER TABLE "maintenance_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "maintenance_logs_attachments";

-- 58. DROP injury_reports_attachments table
ALTER TABLE "injury_reports_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "injury_reports_attachments";

-- 57. DROP attachment from companies table
ALTER TABLE "companies" DROP CONSTRAINT "fk_companies_attachments";

-- 56. DROP feedbacks table
ALTER TABLE "feedbacks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "feedbacks";

-- 55. DROP enum_feedback_status type
DROP TYPE "enum_feedback_status";

-- 54. DROP enum_type_of_feedback type
DROP TYPE "enum_type_of_feedback";

-- 53. DROP enum_feedback_you_are_a type
DROP TYPE "enum_feedback_you_are_a";

-- 52. DROP maintenance_logs table
ALTER TABLE "maintenance_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "maintenance_logs";

-- 51. DROP lease_and_utility_logs table
ALTER TABLE "lease_and_utility_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "lease_and_utility_logs";

-- 50. DROP attachments table
ALTER TABLE "attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "attachments";

-- 49. DROP resources table
ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "resources";

-- 48. DROP enum_resources_type type
DROP TYPE "enum_resources_type";

-- 47. DROP staff_sleep_disturbances table
ALTER TABLE "staff_sleep_disturbances" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_sleep_disturbances";

-- 46. DROP client_risks table
ALTER TABLE "client_risks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_risks";

-- 45. DROP enum_client_risks_consequences type
DROP TYPE "enum_client_risks_consequences";

-- 44. DROP enum_client_risks_likelihood type
DROP TYPE "enum_client_risks_likelihood";

-- 43. DROP enum_client_risks_level_of_risk type
DROP TYPE "enum_client_risks_level_of_risk";

-- 42. DROP meeting_logs table
ALTER TABLE "meeting_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "meeting_logs";

-- 41. DROP enum_meeting_type type
DROP TYPE "enum_meeting_type";

-- 40. DROP whs_logs table
ALTER TABLE "whs_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "whs_logs";

-- 39. DROP corporate_risks table
ALTER TABLE "corporate_risks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "corporate_risks";

-- 38. DROP enum_corporate_risks_consequences type
DROP TYPE "enum_corporate_risks_consequences";

-- 37. DROP enum_corporate_risks_likelihood type
DROP TYPE "enum_corporate_risks_likelihood";

-- 36. DROP enum_corporate_risks_level_of_risk type
DROP TYPE "enum_corporate_risks_level_of_risk";

-- 35. DROP conflict_of_interests table
ALTER TABLE "conflict_of_interests" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "conflict_of_interests";

-- 34. DROP repair_requests table
ALTER TABLE "repair_requests" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "repair_requests";

-- 33. DROP enum_repair_requests_priority type
DROP TYPE "enum_repair_requests_priority";

-- 32. DROP enum_repair_requests_status type
DROP TYPE "enum_repair_requests_status";

-- 31. DROP company_assets table
ALTER TABLE "company_assets" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "company_assets";

-- 30. DROP client_assets table
ALTER TABLE "client_assets" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_assets";

-- 29. DROP doctor_visits table
ALTER TABLE "doctor_visits" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "doctor_visits";

-- 28. DROP enum_appointment_type type
DROP TYPE "enum_appointment_type";

-- 27. DROP enum_health_practitioner type
DROP TYPE "enum_health_practitioner";

-- 26. DROP expense_reimbursements table
ALTER TABLE "expense_reimbursements" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expense_reimbursements";

-- 25. DROP enum_expense_reimbursement_status type
DROP TYPE "enum_expense_reimbursement_status";

-- 24. DROP injury_reports table
ALTER TABLE "injury_reports" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "injury_reports";

-- 23. DROP vehicle_logs table
ALTER TABLE "vehicle_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "vehicle_logs";

-- 22. DROP enum_vehicle type
DROP TYPE "enum_vehicle";

-- 21. DROP transport_behaviours table
ALTER TABLE "transport_behaviours" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "transport_behaviours";

-- 20. DROP client_behaviours table
ALTER TABLE "client_behaviours" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_behaviours";

-- 19. DROP prn_balance_logs table
ALTER TABLE "prn_balance_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "prn_balance_logs";

-- 18. DROP prn_admin_logs table
ALTER TABLE "prn_admin_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "prn_admin_logs";

-- 17. DROP seizure_logs table
ALTER TABLE "seizure_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "seizure_logs";

-- 16. DROP oxygen_saturation_logs table
ALTER TABLE "oxygen_saturation_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "oxygen_saturation_logs";

-- 15. DROP weight_logs table
ALTER TABLE "weight_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "weight_logs";

-- 14. DROP temperature_logs table
ALTER TABLE "temperature_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "temperature_logs";

-- 13. DROP sleep_logs table
ALTER TABLE "sleep_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "sleep_logs";

-- 12. DROP enum_sleep_activity type
DROP TYPE "enum_sleep_activity";

-- 11. Create blood_pressure_logs table
ALTER TABLE "blood_pressure_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "blood_pressure_logs";

-- 10. Create bowel_logs table
ALTER TABLE "bowel_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "bowel_logs";

-- 9. Create blood_glucose_logs table
ALTER TABLE "blood_glucose_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "blood_glucose_logs";

-- 8. Drop users_roles table
ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users_roles";

-- 7. Drop progress_notes table
ALTER TABLE "progress_notes" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes";

-- 6. Drop client_profiles table
ALTER TABLE "client_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_profiles";

-- 5. Drop staff_profiles table
ALTER TABLE "staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_profiles";

-- 4. DROP enum_gender type
DROP TYPE "enum_gender";

-- 3. Drop users table
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users";

-- 2. Drop roles table
ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "roles";

-- 1. Drop companies table
ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "companies";