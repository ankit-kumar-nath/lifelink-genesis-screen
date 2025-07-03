-- Add admin role to the existing user_role enum
ALTER TYPE public.user_role ADD VALUE 'admin';

-- Create locations table for blood bank locations
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  capacity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blood inventory table
CREATE TABLE public.blood_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
  blood_type TEXT NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_available INTEGER NOT NULL DEFAULT 0,
  expiry_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(location_id, blood_type, expiry_date)
);

-- Create blood requests table for tracking requests
CREATE TABLE public.blood_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  blood_type TEXT NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed INTEGER NOT NULL,
  urgency TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'fulfilled', 'rejected')) DEFAULT 'pending',
  hospital_name TEXT NOT NULL,
  doctor_name TEXT,
  reason TEXT,
  location_id UUID REFERENCES public.locations(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blood donations table for tracking donations
CREATE TABLE public.blood_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
  blood_type TEXT NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_donated INTEGER NOT NULL DEFAULT 1,
  donation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_donations ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for locations
CREATE POLICY "Everyone can view locations" 
  ON public.locations FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can manage locations" 
  ON public.locations FOR ALL 
  USING (public.is_admin());

-- RLS Policies for blood_inventory
CREATE POLICY "Everyone can view blood inventory" 
  ON public.blood_inventory FOR SELECT 
  USING (true);

CREATE POLICY "Only admins and healthcare can manage inventory" 
  ON public.blood_inventory FOR ALL 
  USING (
    public.is_admin() OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'healthcare')
  );

-- RLS Policies for blood_requests
CREATE POLICY "Users can view their own requests" 
  ON public.blood_requests FOR SELECT 
  USING (patient_id = auth.uid() OR public.is_admin() OR 
         EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'healthcare'));

CREATE POLICY "Patients can create requests" 
  ON public.blood_requests FOR INSERT 
  WITH CHECK (
    patient_id = auth.uid() AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'patient')
  );

CREATE POLICY "Admins and healthcare can update requests" 
  ON public.blood_requests FOR UPDATE 
  USING (
    public.is_admin() OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'healthcare')
  );

-- RLS Policies for blood_donations
CREATE POLICY "Users can view their own donations" 
  ON public.blood_donations FOR SELECT 
  USING (donor_id = auth.uid() OR public.is_admin() OR 
         EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'healthcare'));

CREATE POLICY "Donors can create donations" 
  ON public.blood_donations FOR INSERT 
  WITH CHECK (
    donor_id = auth.uid() AND 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'donor')
  );

CREATE POLICY "Admins and healthcare can manage donations" 
  ON public.blood_donations FOR ALL 
  USING (
    public.is_admin() OR 
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'healthcare')
  );

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blood_inventory_updated_at
  BEFORE UPDATE ON public.blood_inventory
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blood_requests_updated_at
  BEFORE UPDATE ON public.blood_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blood_donations_updated_at
  BEFORE UPDATE ON public.blood_donations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default locations
INSERT INTO public.locations (name, address, city, state, phone, email, capacity) VALUES
('Central Blood Bank', '123 Main Street', 'New York', 'NY', '+1-555-0101', 'central@bloodbank.com', 1000),
('Metro Hospital Blood Center', '456 Oak Avenue', 'Los Angeles', 'CA', '+1-555-0102', 'metro@hospital.com', 800),
('Community Blood Drive Center', '789 Pine Road', 'Chicago', 'IL', '+1-555-0103', 'community@bloodcenter.org', 600);