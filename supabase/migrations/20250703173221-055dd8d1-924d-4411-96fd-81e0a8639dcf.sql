-- Add unique constraint on email if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'users_email_unique'
    ) THEN
        ALTER TABLE public.users ADD CONSTRAINT users_email_unique UNIQUE (email);
    END IF;
END $$;

-- Create a function to safely create or update admin user
CREATE OR REPLACE FUNCTION public.create_master_admin()
RETURNS BOOLEAN AS $$
DECLARE
    admin_exists BOOLEAN;
BEGIN
    -- Check if admin user already exists
    SELECT EXISTS(
        SELECT 1 FROM public.users 
        WHERE email = 'lifelink@gmail.com'
    ) INTO admin_exists;
    
    IF admin_exists THEN
        -- Update existing user to admin role
        UPDATE public.users 
        SET role = 'admin',
            first_name = 'Master',
            last_name = 'Admin'
        WHERE email = 'lifelink@gmail.com';
        
        RETURN TRUE;
    ELSE
        -- Insert new admin user (this will be linked when they sign up)
        INSERT INTO public.users (
            email,
            first_name,
            last_name,
            role,
            created_at
        ) VALUES (
            'lifelink@gmail.com',
            'Master',
            'Admin',
            'admin',
            now()
        );
        
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the function to create master admin
SELECT public.create_master_admin();

-- Create a function to promote users to admin (for future use)
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.users 
  SET role = 'admin' 
  WHERE email = user_email;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;