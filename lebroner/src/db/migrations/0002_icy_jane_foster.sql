CREATE TYPE "public"."category" AS ENUM('News', 'Game Recap', 'Opinion', 'Lifestyle');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "category" "category" DEFAULT 'News' NOT NULL;