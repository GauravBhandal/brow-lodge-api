ALTER TABLE "tint_consultation_details" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "tint_consultation_details";

ALTER TABLE "tint_consultation" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "tint_consultation";

ALTER TABLE "wax_consultation_details" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "wax_consultation_details";

ALTER TABLE "wax_consultation" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "wax_consultation";

ALTER TABLE "eyelash_extension_details" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "eyelash_extension_details";

ALTER TABLE "eyelash_extension" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "eyelash_extension";

ALTER TABLE "companies" DROP CONSTRAINT "fk_companies_attachments";

ALTER TABLE "attachments" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "attachments";

ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
DROP TABLE IF EXISTS "users_roles";

-- 4. Drop staff_profiles table
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