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
    "preferred_name" VARCHAR NOT NULL,
    "attachment" UUID,
    "email" VARCHAR NOT NULL,
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

-- 4. Create site table
CREATE TABLE IF NOT EXISTS "site" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "number_of_employee" BIGINT NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
ALTER TABLE "site" ENABLE ROW LEVEL SECURITY;
