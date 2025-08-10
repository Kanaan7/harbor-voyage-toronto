-- Enable RLS
alter table profiles enable row level security;
alter table boats enable row level security;
alter table bookings enable row level security;

-- Profiles
create policy "read own profile" on profiles for select using (auth.uid() = id);
create policy "update own profile" on profiles for update using (auth.uid() = id);

-- Boats
create policy "public read boats" on boats for select using (true);
create policy "owner manage boats" on boats for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

-- Bookings
create policy "create booking as user" on bookings for insert with check (auth.uid() = user_id);
create policy "read own bookings" on bookings for select using (auth.uid() = user_id);
create policy "owner read bookings for their boats" on bookings for select using (
  exists(select 1 from boats bt where bt.id = boat_id and bt.owner_id = auth.uid())
);
