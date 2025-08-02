-- Create user profiles table with roles
CREATE TYPE user_role AS ENUM ('charter_owner', 'customer');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create boat listings table
CREATE TABLE public.boat_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_per_hour DECIMAL(10,2) NOT NULL,
  capacity INTEGER NOT NULL,
  boat_type TEXT,
  pickup_location_name TEXT NOT NULL,
  pickup_latitude DECIMAL(10,8),
  pickup_longitude DECIMAL(11,8),
  images TEXT[], -- Array of image URLs
  amenities TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boat_id UUID REFERENCES public.boat_listings(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_hours INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  stripe_payment_intent_id TEXT,
  customer_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create blocked dates table for owners to block availability
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boat_id UUID REFERENCES public.boat_listings(id) ON DELETE CASCADE NOT NULL,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(boat_id, blocked_date)
);

-- Create mailing list table
CREATE TABLE public.mailing_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boat_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mailing_list ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Boat listings policies
CREATE POLICY "Anyone can view active boat listings" ON public.boat_listings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Owners can manage their own listings" ON public.boat_listings
  FOR ALL USING (auth.uid() = owner_id);

-- Bookings policies
CREATE POLICY "Customers can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Owners can view bookings for their boats" ON public.bookings
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Customers can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Owners can update bookings for their boats" ON public.bookings
  FOR UPDATE USING (auth.uid() = owner_id);

-- Blocked dates policies
CREATE POLICY "Anyone can view blocked dates" ON public.blocked_dates
  FOR SELECT USING (true);

CREATE POLICY "Owners can manage blocked dates for their boats" ON public.blocked_dates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.boat_listings 
      WHERE id = boat_id AND owner_id = auth.uid()
    )
  );

-- Mailing list policies (public can insert, only authenticated can view)
CREATE POLICY "Anyone can subscribe to mailing list" ON public.mailing_list
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view mailing list" ON public.mailing_list
  FOR SELECT USING (auth.jwt() IS NOT NULL);

-- Create storage bucket for boat images
INSERT INTO storage.buckets (id, name, public) VALUES ('boat-images', 'boat-images', true);

-- Storage policies for boat images
CREATE POLICY "Anyone can view boat images" ON storage.objects
  FOR SELECT USING (bucket_id = 'boat-images');

CREATE POLICY "Authenticated users can upload boat images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'boat-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own boat images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'boat-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_boat_listings_updated_at
  BEFORE UPDATE ON public.boat_listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();