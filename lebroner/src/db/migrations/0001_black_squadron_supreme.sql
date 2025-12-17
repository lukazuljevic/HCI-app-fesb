CREATE TYPE "public"."role" AS ENUM('admin', 'user');
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;