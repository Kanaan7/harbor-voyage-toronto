export type Profile = {
  id: string;
  role: 'renter' | 'owner' | string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Boat = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  price_per_hour: number;
  capacity: number;
  location: string;
  features: string[];
  created_at: string;
  lat?: number;
  lng?: number;
};

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type Booking = {
  id: string;
  boat_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
};
