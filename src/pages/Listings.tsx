import React, { useEffect, useMemo, useState } from 'react'
import { listBoats } from '../lib/supabase/boats'
import { Boat } from '../types'
import BoatCard from '../components/BoatCard'

type Filters = { q: string; minCap?: number; maxPrice?: number; sort: 'new' | 'priceAsc' | 'priceDesc' | 'capDesc' }

function SkeletonCard() {
  return (
    <div className="rounded-2xl border p-4 animate-pulse">
      <div className="h-40 w-full bg-gray-100 rounded-xl mb-4" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-5/6 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  )
}

export default function Listings() {
  const [boats, setBoats] = useState<Boat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({ q: '', sort: 'new' })

  useEffect(() => {
    setLoading(true); setError(null)
    listBoats({ q: filters.q, minCap: filters.minCap, maxPrice: filters.maxPrice })
      .then(setBoats)
      .catch((e) => setError(e.message ?? 'Failed to load boats'))
      .finally(() => setLoading(false))
  }, [filters.q, filters.minCap, filters.maxPrice])

  const sorted = useMemo(() => {
    const arr = [...boats]
    switch (filters.sort) {
      case 'priceAsc':  return arr.sort((a,b)=>a.price_per_hour - b.price_per_hour)
      case 'priceDesc': return arr.sort((a,b)=>b.price_per_hour - a.price_per_hour)
      case 'capDesc':   return arr.sort((a,b)=>b.capacity - a.capacity)
      default:          return arr // 'new' is already newest-first from the query
    }
  }, [boats, filters.sort])

  const reset = () => setFilters({ q: '', sort: 'new' })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-50 to-transparent">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse Boats</h1>
          <p className="mt-1 text-gray-600">Find the perfect boat around Toronto by capacity, price, and features.</p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-end gap-3 py-3">
            <label className="flex-1 min-w-[200px] text-sm">
              Search
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="Pontoon, yacht, 'Toronto'…"
                value={filters.q}
                onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
              />
            </label>

            <label className="text-sm">
              Min capacity
              <input
                type="number" min={1}
                className="mt-1 w-36 border rounded-lg px-3 py-2"
                value={filters.minCap ?? ''}
                onChange={e => setFilters(f => ({ ...f, minCap: e.target.value ? Number(e.target.value) : undefined }))}
              />
            </label>

            <label className="text-sm">
              Max $/hr
              <input
                type="number" min={0}
                className="mt-1 w-36 border rounded-lg px-3 py-2"
                value={filters.maxPrice ?? ''}
                onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
              />
            </label>

            <label className="text-sm">
              Sort
              <select
                className="mt-1 w-40 border rounded-lg px-3 py-2 bg-white"
                value={filters.sort}
                onChange={e => setFilters(f => ({ ...f, sort: e.target.value as Filters['sort'] }))}
              >
                <option value="new">Newest</option>
                <option value="priceAsc">Price: Low → High</option>
                <option value="priceDesc">Price: High → Low</option>
                <option value="capDesc">Capacity: High → Low</option>
              </select>
            </label>

            <button
              className="ml-auto border rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Status row */}
        <div className="mb-4 text-sm text-gray-600">
          {loading ? 'Loading boats…' : `${sorted.length} result${sorted.length === 1 ? '' : 's'}`}
          {error && <span className="ml-2 text-red-600">• {error}</span>}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map(b => (
              <BoatCard key={b.id} boat={b} onClick={() => location.assign(`/boat/${b.id}`)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-10 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xl">🛥️</span>
            </div>
            <h2 className="text-base font-semibold">No boats match your filters</h2>
            <p className="mt-1 text-sm text-gray-600">Try clearing the search or widening your price/capacity.</p>
            <button
              className="mt-4 inline-flex items-center rounded-lg bg-black px-4 py-2 text-white"
              onClick={reset}
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
