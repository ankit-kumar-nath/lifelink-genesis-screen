-- Create the master admin user
-- Note: This creates the user record in our users table
-- The actual auth user will need to be created through signup

INSERT INTO public.users (
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000001', -- Placeholder UUID for master admin
  'lifelink@gmail.com',
  'Master',
  'Admin',
  'admin',
  now()
) ON CONFLICT (email) DO UPDATE SET 
  role = 'admin',
  first_name = 'Master',
  last_name = 'Admin';

-- Also ensure we have a function to promote users to admin
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.users 
  SET role = 'admin' 
  WHERE email = user_email;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant usage to authenticated users
GRANT EXECUTE ON FUNCTION public.promote_to_admin(TEXT) TO authenticated;