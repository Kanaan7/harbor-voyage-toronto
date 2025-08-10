import { supabase } from '../../integrations/supabase/client'
import type { Boat } from '../../types'
import type { TablesInsert, TablesUpdate } from '../../integrations/supabase/types'

function mapListingToBoat(row: any): Boat {
  return {
    id: row.id,
    owner_id: row.owner_id,
    title: row.title,
    description: row.description ?? '',
    price_per_hour: Number(row.price_per_hour),
    capacity: row.capacity,
    location: row.pickup_location_name,
    features: (row.amenities ?? []) as string[],
    created_at: row.created_at,
    lat: row.pickup_latitude ? Number(row.pickup_latitude) : undefined,
    lng: row.pickup_longitude ? Number(row.pickup_longitude) : undefined,
  }
}

export async function listBoats(query?: { minCap?: number; maxPrice?: number; q?: string }) {
  let req = supabase.from('boat_listings').select('*').order('created_at', { ascending: false })
  if (query?.minCap) req = req.gte('capacity', query.minCap)
  if (query?.maxPrice) req = req.lte('price_per_hour', query.maxPrice)
  if (query?.q) req = req.ilike('title', `%${query.q}%`)
  const { data, error } = await req
  if (error) throw error
  return (data ?? []).map(mapListingToBoat) as Boat[]
}

export async function getBoat(id: string) {
  const { data, error } = await supabase.from('boat_listings').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  if (!data) throw new Error('Boat not found')
  return mapListingToBoat(data)
}

export async function createBoat(payload: Omit<Boat, 'id'|'created_at'>) {
  const toInsert: TablesInsert<'boat_listings'> = {
    owner_id: payload.owner_id,
    title: payload.title,
    description: payload.description,
    price_per_hour: payload.price_per_hour,
    capacity: payload.capacity,
    pickup_location_name: payload.location,
    amenities: payload.features,
    is_active: true,
  }
  const { data, error } = await supabase.from('boat_listings').insert(toInsert).select().single()
  if (error) throw error
  return mapListingToBoat(data)
}

export async function updateBoat(id: string, patch: Partial<Boat>) {
  const toUpdate: TablesUpdate<'boat_listings'> = {}
  if (patch.title !== undefined) toUpdate.title = patch.title
  if (patch.description !== undefined) toUpdate.description = patch.description
  if (patch.price_per_hour !== undefined) toUpdate.price_per_hour = patch.price_per_hour
  if (patch.capacity !== undefined) toUpdate.capacity = patch.capacity
  if (patch.location !== undefined) toUpdate.pickup_location_name = patch.location
  if (patch.features !== undefined) toUpdate.amenities = patch.features

  const { data, error } = await supabase
    .from('boat_listings')
    .update(toUpdate)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return mapListingToBoat(data)
}

