alter table "public"."questions" drop column "follow_up_questions";

alter table "public"."questions" drop column "skills";

alter table "public"."questions" add column "follow_up" text[];

alter table "public"."questions" add column "relevance" text;

alter table "public"."questions" add column "topic" text;

alter table "public"."questions" alter column "notes" set default ''::text;


