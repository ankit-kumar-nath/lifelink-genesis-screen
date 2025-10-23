-- Fix the admin user ID to match the auth user ID
UPDATE public.users 
SET id = '049985fe-18bc-496b-9432-cbc3074e5851'
WHERE email = 'lifelink.co.in@gmail.com';