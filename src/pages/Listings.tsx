import React, { useEffect, useState } from 'react'
import { listBoats } from '../lib/supabase/boats'
import type { Boat } from '../types'
import BoatCard from '../components/BoatCard'
import BoatFilters, { Filters } from '../components/BoatFilters'

export default function Listings() {
  const [boats, setBoats] = useState<Boat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({ q: '' })

  useEffect(() => {
    setLoading(true)
    setError(null)
    listBoats({ q: filters.q, minCap: filters.minCap, maxPrice: filters.maxPrice })
      .then(setBoats)
      .catch((e) => setError(e.message ?? 'Failed to load boats'))
      .finally(() => setLoading(false))
  }, [filters])

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Boats</h1>
      <BoatFilters value={filters} onChange={setFilters} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {loading ? <div>Loading…</div> : (
        <div className="grid md:grid-cols-2 gap-4">
          {boats.map(b => <BoatCard key={b.id} boat={b} onClick={()=>location.assign(`/boat/${b.id}`)} />)}
        </div>
      )}
      {!loading && boats.length === 0 && <div className="text-sm text-gray-600">No boats yet.</div>}
    </div>
  )
}
