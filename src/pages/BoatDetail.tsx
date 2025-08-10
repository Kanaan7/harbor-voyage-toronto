import React, { useEffect, useState } from 'react'
import { getBoat } from '../lib/supabase/boats'
import type { Boat } from '../types'
import BookingForm from '../components/BookingForm'
import { supabase } from '../integrations/supabase/client'
import MapLeaflet from '../components/MapLeaflet'
import { ContactOwner } from '../components/boats/ContactOwner'
export default function BoatDetail() {
  const id = location.pathname.split('/').pop() as string
  const [boat, setBoat] = useState<Boat | null>(null)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    getBoat(id).then(setBoat)
    supabase.auth.getUser().then(res => setUserId(res.data.user?.id ?? ''))
  }, [id])

  if (!boat) return <div className="max-w-3xl mx-auto p-4">Loading…</div>

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">{boat.title}</h1>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-200 h-28 rounded" />
        <div className="bg-gray-200 h-28 rounded" />
        <div className="bg-gray-200 h-28 rounded" />
      </div>
      <p className="text-gray-600">{boat.description}</p>
      <div className="text-sm text-gray-500">Capacity {boat.capacity} • {boat.location} • ${boat.price_per_hour}/hr</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="border rounded-2xl p-4">
            <h2 className="font-semibold mb-2">Request to book</h2>
            {userId ? (
              <BookingForm boatId={boat.id} userId={userId} pricePerHour={boat.price_per_hour} />
            ) : (
              <div className="text-sm">
                Please sign in to request a booking.
              </div>
            )}
          </div>
          <ContactOwner boatName={boat.title} />
        </div>
        <div>
          {boat.lat && boat.lng ? (
            <MapLeaflet lat={boat.lat} lng={boat.lng} label={`Pickup: ${boat.location}`} />
          ) : (
            <div className="text-sm text-gray-500">Pickup location map coming soon.</div>
          )}
        </div>
      </div>
    </div>
  )
}
