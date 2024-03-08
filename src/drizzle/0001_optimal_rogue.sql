CREATE TABLE IF NOT EXISTS "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"done" boolean DEFAULT false,
	"title" varchar(100) NOT NULL,
	"description" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" varchar(30)
);
