-- 56. DROP expense_reimbursements_attachments table
ALTER TABLE "expense_reimbursements_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expense_reimbursements_attachments";

-- 55. DROP restrictive_practice_logs_staff_profiles table
ALTER TABLE "restrictive_practice_logs_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs_staff_profiles";

-- 54. DROP restrictive_practice_logs table
ALTER TABLE "restrictive_practice_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "restrictive_practice_logs";

-- 53. DROP key_decisions table
ALTER TABLE "key_decisions" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "key_decisions";

-- 52. DROP incident_reports_attachments table
ALTER TABLE "incident_reports_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_attachments";

-- 51. DROP incident_reports_incident_types table
ALTER TABLE "incident_reports_incident_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_incident_types";

-- 50. DROP incident_reports_staff_profiles table
ALTER TABLE "incident_reports_staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports_staff_profiles";

-- 49. DROP incident_reports table
ALTER TABLE "incident_reports" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_reports";

-- 48. DROP incident_types table
DELETE FROM "incident_types";
ALTER TABLE "incident_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "incident_types";

-- 47. DROP staff_documents_attachments table
ALTER TABLE "staff_documents_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_documents_attachments";

-- 46. DROP staff_documents table
ALTER TABLE "staff_documents" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_documents";

-- 45. DROP staff_document_types table
ALTER TABLE "staff_document_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_document_types";

-- 44. DROP staff_document_categories table
ALTER TABLE "staff_document_categories" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_document_categories";

-- 43. DROP client_documents_attachments table
ALTER TABLE "client_documents_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_documents_attachments";

-- 42. DROP client_documents table
ALTER TABLE "client_documents" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_documents";

-- 41. DROP client_document_types table
ALTER TABLE "client_document_types" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_document_types";

-- 40. DROP client_document_categories table
ALTER TABLE "client_document_categories" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_document_categories";

-- 39. DROP repair_requests_attachments table
ALTER TABLE "repair_requests_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "repair_requests_attachments";

-- 38. DROP lease_and_utility_logs_attachments table
ALTER TABLE "lease_and_utility_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "lease_and_utility_logs_attachments";

-- 37. DROP maintenance_logs_attachments table
ALTER TABLE "maintenance_logs_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "maintenance_logs_attachments";

-- 36. DROP injury_reports_attachments table
ALTER TABLE "injury_reports_attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "injury_reports_attachments";

-- 35. DROP attachment from companies table
ALTER TABLE "companies" DROP CONSTRAINT "fk_companies_attachments";

-- 34. DROP feedbacks table
ALTER TABLE "feedbacks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "feedbacks";

-- 33. DROP maintenance_logs table
ALTER TABLE "maintenance_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "maintenance_logs";

-- 32. DROP lease_and_utility_logs table
ALTER TABLE "lease_and_utility_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "lease_and_utility_logs";

-- 31. DROP attachments table
ALTER TABLE "attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "attachments";

-- 30. DROP resources table
ALTER TABLE "resources" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "resources";

-- 29. DROP staff_sleep_disturbances table
ALTER TABLE "staff_sleep_disturbances" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_sleep_disturbances";

-- 28. DROP client_risks table
ALTER TABLE "client_risks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_risks";

-- 27. DROP meeting_logs table
ALTER TABLE "meeting_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "meeting_logs";

-- 26. DROP corporate_risks table
ALTER TABLE "corporate_risks" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "corporate_risks";

-- 25. DROP conflict_of_interests table
ALTER TABLE "conflict_of_interests" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "conflict_of_interests";

-- 24. DROP repair_requests table
ALTER TABLE "repair_requests" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "repair_requests";

-- 23. DROP company_assets table
ALTER TABLE "company_assets" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "company_assets";

-- 22. DROP client_assets table
ALTER TABLE "client_assets" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_assets";

-- 21. DROP doctor_visits table
ALTER TABLE "doctor_visits" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "doctor_visits";

-- 20. DROP expense_reimbursements table
ALTER TABLE "expense_reimbursements" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "expense_reimbursements";

-- 19. DROP injury_reports table
ALTER TABLE "injury_reports" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "injury_reports";

-- 18. DROP vehicle_logs table
ALTER TABLE "vehicle_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "vehicle_logs";

-- 17. DROP client_behaviours table
ALTER TABLE "client_behaviours" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_behaviours";

-- 16. DROP prn_balance_logs table
ALTER TABLE "prn_balance_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "prn_balance_logs";

-- 15. DROP prn_admin_logs table
ALTER TABLE "prn_admin_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "prn_admin_logs";

-- 14. DROP seizure_logs table
ALTER TABLE "seizure_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "seizure_logs";

-- 13. DROP oxygen_saturation_logs table
ALTER TABLE "oxygen_saturation_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "oxygen_saturation_logs";

-- 12. DROP weight_logs table
ALTER TABLE "weight_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "weight_logs";

-- 11. DROP temperature_logs table
ALTER TABLE "temperature_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "temperature_logs";

-- 10. Create blood_pressure_logs table
ALTER TABLE "blood_pressure_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "blood_pressure_logs";

-- 9. Create bowel_logs table
ALTER TABLE "bowel_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "bowel_logs";

-- 8. Create blood_glucose_logs table
ALTER TABLE "blood_glucose_logs" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "blood_glucose_logs";

-- 7. Drop users_roles table
ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users_roles";

-- 6. Drop progress_notes table
ALTER TABLE "progress_notes" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "progress_notes";

-- 5. Drop client_profiles table
ALTER TABLE "client_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "client_profiles";

-- 4. Drop staff_profiles table
ALTER TABLE "staff_profiles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "staff_profiles";

-- 3. Drop users table
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users";

-- 2. Drop roles table
ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "roles";

-- 1. Drop companies table
ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "companies";