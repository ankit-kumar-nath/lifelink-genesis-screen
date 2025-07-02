
-- Fix the users table to use UUID for id column to match Supabase Auth
ALTER TABLE public.users ALTER COLUMN id TYPE uuid USING id::text::uuid;
