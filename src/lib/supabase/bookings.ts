import { supabase } from '../../integrations/supabase/client'
import type { Booking } from '../../types'
import type { TablesInsert } from '../../integrations/supabase/types'

function toIsoDate(d: Date) {
  return d.toISOString().slice(0, 10)
}
function toSqlTime(d: Date) {
  return d.toISOString().slice(11, 19)
}
function mapDbToLocal(b: any): Booking {
  const startIso = `${b.booking_date}T${b.start_time}`
  const endIso = `${b.booking_date}T${b.end_time}`
  return {
    id: b.id,
    boat_id: b.boat_id,
    user_id: b.customer_id,
    start_time: new Date(startIso).toISOString(),
    end_time: new Date(endIso).toISOString(),
    status: b.status,
    notes: b.customer_notes ?? null,
    created_at: b.created_at,
  }
}

export async function createBooking(payload: { boat_id: string; customer_id: string; start_time: string; end_time: string; notes?: string }) {
  const { data: boat, error: boatErr } = await supabase
    .from('boat_listings')
    .select('owner_id, price_per_hour')
    .eq('id', payload.boat_id)
    .single()
  if (boatErr) throw boatErr

  const start = new Date(payload.start_time)
  const end = new Date(payload.end_time)
  const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)))

  const toInsert: TablesInsert<'bookings'> = {
    boat_id: payload.boat_id,
    owner_id: boat.owner_id,
    customer_id: payload.customer_id,
    booking_date: toIsoDate(start),
    start_time: toSqlTime(start),
    end_time: toSqlTime(end),
    total_hours: hours,
    total_price: Number(boat.price_per_hour) * hours,
    customer_notes: payload.notes,
    status: 'pending',
  }

  const { data, error } = await supabase.from('bookings').insert(toInsert).select().single()
  if (error) throw error
  return mapDbToLocal(data)
}

export async function listMyBookings(customerId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapDbToLocal) as Booking[]
}

export async function listOwnerBookings(ownerId: string) {
  const { data: boats, error: boatsErr } = await supabase
    .from('boat_listings')
    .select('id')
    .eq('owner_id', ownerId)
  if (boatsErr) throw boatsErr
  const ids = (boats ?? []).map((b) => b.id)
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .in('boat_id', ids)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(mapDbToLocal) as Booking[]
}

