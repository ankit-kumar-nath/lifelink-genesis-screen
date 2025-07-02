
-- First, let's check if there's any data and handle the conversion properly
-- Drop the existing id column and recreate it as UUID
ALTER TABLE public.users DROP COLUMN id;
ALTER TABLE public.users ADD COLUMN id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY;
