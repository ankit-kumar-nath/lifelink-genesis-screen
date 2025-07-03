
-- Create an enum for user roles
CREATE TYPE public.user_role AS ENUM ('donor', 'patient', 'healthcare');

-- Add role column to users table
ALTER TABLE public.users ADD COLUMN role user_role NOT NULL DEFAULT 'donor';

-- Update existing users to have a default role (optional, for existing data)
UPDATE public.users SET role = 'donor' WHERE role IS NULL;
