-- 44. DROP staff_sleep_disturbances table
DROP TABLE IF EXISTS "staff_sleep_disturbances";

-- 43. DROP client_risks table
DROP TABLE IF EXISTS "client_risks";

-- 42. DROP enum_client_risks_consequences type
DROP TYPE "enum_client_risks_consequences";

-- 41. DROP enum_client_risks_likelihood type
DROP TYPE "enum_client_risks_likelihood";

-- 40. DROP enum_client_risks_level_of_risk type
DROP TYPE "enum_client_risks_level_of_risk";

-- 39. DROP corporate_risks table
DROP TABLE IF EXISTS "corporate_risks";

-- 38. DROP enum_corporate_risks_consequences type
DROP TYPE "enum_corporate_risks_consequences";

-- 37. DROP enum_corporate_risks_likelihood type
DROP TYPE "enum_corporate_risks_likelihood";

-- 36. DROP enum_corporate_risks_level_of_risk type
DROP TYPE "enum_corporate_risks_level_of_risk";

-- 35. DROP conflict_of_interests table
DROP TABLE IF EXISTS "conflict_of_interests";

-- 34. DROP repair_requests table
DROP TABLE IF EXISTS "repair_requests";

-- 33. DROP enum_repair_requests_priority type
DROP TYPE "enum_repair_requests_priority";

-- 32. DROP enum_repair_requests_status type
DROP TYPE "enum_repair_requests_status";

-- 31. DROP company_assets table
DROP TABLE IF EXISTS "company_assets";

-- 30. DROP client_assets table
DROP TABLE IF EXISTS "client_assets";

-- 29. DROP doctor_visits table
DROP TABLE IF EXISTS "doctor_visits";

-- 28. DROP enum_appointment_type type
DROP TYPE "enum_appointment_type";

-- 27. DROP enum_health_practitioner type
DROP TYPE "enum_health_practitioner";

-- 26. DROP expense_reimbursements table
DROP TABLE IF EXISTS "expense_reimbursements";

-- 25. DROP enum_expense_reimbursement_status type
DROP TYPE "enum_expense_reimbursement_status";

-- 24. DROP injury_reports table
DROP TABLE IF EXISTS "injury_reports";

-- 23. DROP vehicle_logs table
DROP TABLE IF EXISTS "vehicle_logs";

-- 22. DROP enum_vehicle type
DROP TYPE "enum_vehicle";

-- 21. DROP transport_behaviours table
DROP TABLE IF EXISTS "transport_behaviours";

-- 20. DROP client_behaviours table
DROP TABLE IF EXISTS "client_behaviours";

-- 19. DROP prn_balance_logs table
DROP TABLE IF EXISTS "prn_balance_logs";

-- 18. DROP prn_admin_logs table
DROP TABLE IF EXISTS "prn_admin_logs";

-- 17. DROP seizure_logs table
DROP TABLE IF EXISTS "seizure_logs";

-- 16. DROP oxygen_saturation_logs table
DROP TABLE IF EXISTS "oxygen_saturation_logs";

-- 15. DROP weight_logs table
DROP TABLE IF EXISTS "weight_logs";

-- 14. DROP temperature_logs table
DROP TABLE IF EXISTS "temperature_logs";

-- 13. DROP sleep_logs table
DROP TABLE IF EXISTS "sleep_logs";

-- 12. DROP enum_sleep_activity type
DROP TYPE "enum_sleep_activity";

-- 11. Create blood_pressure_logs table
DROP TABLE IF EXISTS "blood_pressure_logs";

-- 10. Create bowel_logs table
DROP TABLE IF EXISTS "bowel_logs";

-- 9. Create blood_glucose_logs table
DROP TABLE IF EXISTS "blood_glucose_logs";

-- 8. Drop users_roles table
DROP TABLE IF EXISTS "users_roles";

-- 7. Drop progress_notes table
DROP TABLE IF EXISTS "progress_notes";

-- 6. Drop client_profiles table
DROP TABLE IF EXISTS "client_profiles";

-- 5. DROP enum_gender type
DROP TYPE "enum_gender";

-- 4. Drop staff_profiles table
DROP TABLE IF EXISTS "staff_profiles";

-- 3. Drop users table
DROP TABLE IF EXISTS "users";

-- 2. Drop roles table
DROP TABLE IF EXISTS "roles";

-- 1. Drop companies table
DROP TABLE IF EXISTS "companies";