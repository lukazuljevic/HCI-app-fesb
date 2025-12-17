CREATE TYPE "public"."team" AS ENUM('Lakers', 'Cavaliers', 'Heat', 'USA');
ALTER TABLE "highlights" ADD COLUMN "team" "team" DEFAULT 'Lakers' NOT NULL;
ALTER TABLE "highlights" ADD COLUMN "year" text DEFAULT '2024' NOT NULL;