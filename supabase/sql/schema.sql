-- Tables
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('renter','owner')),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

create table if not exists boats (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null,
  price_per_hour numeric not null,
  capacity int not null,
  location text not null,
  features text[] not null default '{}',
  created_at timestamp with time zone default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  boat_id uuid not null references boats(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  notes text,
  created_at timestamp with time zone default now()
);

-- Example owner bookings RPC (used by listOwnerBookings)
create or replace function owner_bookings(p_owner_id uuid)
returns setof bookings
language sql
security definer
as $$
  select b.*
  from bookings b
  join boats bt on bt.id = b.boat_id
  where bt.owner_id = p_owner_id
  order by b.created_at desc;
$$;
