-- 1. Create companies table
CREATE TABLE IF NOT EXISTS "companies" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
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
    "full_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
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
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 5. Create client_profiles table
CREATE TABLE IF NOT EXISTS "client_profiles" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);

-- 6. Create progress_notes table
CREATE TABLE IF NOT EXISTS "progress_notes" (
    "id" UUID NOT NULL,
    "notes" VARCHAR NOT NULL,
    "company" UUID NOT NULL REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deleted" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);