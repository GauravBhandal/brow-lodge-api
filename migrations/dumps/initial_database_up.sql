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

-- 4. Create staff_profiles table
CREATE TABLE IF NOT EXISTS "staff_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "attachment" UUID,
    "email" VARCHAR,
    "gender" VARCHAR (255),
    "date_of_birth" TIMESTAMP WITH TIME ZONE,
    "personal_contact_number" VARCHAR,
    "address" VARCHAR,
    "job_title" VARCHAR,
    "employment_start_date" TIMESTAMP WITH TIME ZONE,
    "employment_end_date" TIMESTAMP WITH TIME ZONE,
    "archived" BOOLEAN NOT NULL DEFAULT FALSE,
    "user" UUID REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "staff_profiles" ENABLE ROW LEVEL SECURITY;


-- 4. Create client_profiles table
CREATE TABLE IF NOT EXISTS "client_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "attachment" UUID,
    "email" VARCHAR,
    "gender" VARCHAR (255),
    "date_of_birth" TIMESTAMP WITH TIME ZONE,
    "personal_contact_number" VARCHAR,
    "address" VARCHAR,
    "archived" BOOLEAN NOT NULL DEFAULT FALSE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "client_profiles" ENABLE ROW LEVEL SECURITY;

-- 7. Create users_roles table
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

-- 31. Create attachments table
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

-- 35. Add attachment to companies table
ALTER TABLE "companies" ADD CONSTRAINT "fk_companies_attachments"
FOREIGN KEY ("attachment") REFERENCES "attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE; 

CREATE TABLE IF NOT EXISTS "eyelash_extension" (
    "id" UUID NOT NULL,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "technician_name" VARCHAR NOT NULL,
    "doctor_name" VARCHAR NOT NULL,
    "doctor_address" VARCHAR NOT NULL,
    "is_pregnant" BOOLEAN DEFAULT FALSE,
    "eye_syndrome" BOOLEAN DEFAULT FALSE,
    "hrt" BOOLEAN DEFAULT FALSE,
    "eye_complaint" BOOLEAN DEFAULT FALSE,
    "skin_patch_test" BOOLEAN DEFAULT FALSE,
    "skin_patch_test_date" DATE,
    "date" DATE NOT NULL,
    "client_sign" VARCHAR,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "eyelash_extension" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "eyelash_extension_details" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "therapist" VARCHAR,
    "feedback" VARCHAR,
    "eye_feedback" VARCHAR,
    "care_feedback" VARCHAR,
    "client_sign" VARCHAR NOT NULL,
    "eyelash" UUID NOT NULL REFERENCES "eyelash_extension" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "eyelash_extension_details" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "wax_consultation" (
    "id" UUID NOT NULL,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
     "technician_name" VARCHAR NOT NULL,
    "doctor_name" VARCHAR NOT NULL,
    "doctor_address" VARCHAR NOT NULL,
    "disease" VARCHAR[],
    "contain_products" VARCHAR[],
    "prescribed_medicine" VARCHAR,
    "wax_treatment" BOOLEAN DEFAULT FALSE,
    "date" DATE NOT NULL,
    "client_sign" VARCHAR,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "wax_consultation" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "wax_consultation_details" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "therapist" VARCHAR,
    "skin_before" VARCHAR,
    "treatment" VARCHAR,
    "skin_after" VARCHAR,
    "care_given" VARCHAR,
    "client_sign" VARCHAR,
    "wax" UUID NOT NULL REFERENCES "wax_consultation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "wax_consultation_details" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "tint_consultation" (
    "id" UUID NOT NULL,
    "client" UUID NOT NULL REFERENCES "client_profiles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
     "technician_name" VARCHAR NOT NULL,
    "doctor_name" VARCHAR NOT NULL,
    "doctor_address" VARCHAR NOT NULL,
    "colour_eyebrow" VARCHAR,
    "colour_eyelash" VARCHAR,
    "disease" VARCHAR[],
    "skin_patch_test" BOOLEAN DEFAULT FALSE,
    "skin_patch_test_date" DATE,
    "date" DATE NOT NULL,
    "client_sign" VARCHAR,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "tint_consultation" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS "tint_consultation_details" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "therapist" VARCHAR,
    "brow_colour" VARCHAR,
    "lash_colour" VARCHAR,
    "overleaf_condition" VARCHAR,
    "care_given" VARCHAR,
    "client_sign" VARCHAR,
    "tint" UUID NOT NULL REFERENCES "tint_consultation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "tint_consultation_details" ENABLE ROW LEVEL SECURITY;
