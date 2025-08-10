import React from 'react'

export type Filters = { q: string; minCap?: number; maxPrice?: number }
type Props = { value: Filters; onChange: (f: Filters) => void }

export default function BoatFilters({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <label className="flex flex-col text-sm">
        Search
        <input
          className="border rounded px-2 py-1"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Pontoon, yacht..."
        />
      </label>
      <label className="flex flex-col text-sm">
        Min capacity
        <input
          type="number" className="border rounded px-2 py-1" min={1}
          value={value.minCap ?? ''} onChange={(e) => onChange({ ...value, minCap: e.target.value ? Number(e.target.value) : undefined })}
        />
      </label>
      <label className="flex flex-col text-sm">
        Max $/hr
        <input
          type="number" className="border rounded px-2 py-1" min={0}
          value={value.maxPrice ?? ''} onChange={(e) => onChange({ ...value, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        />
      </label>
    </div>
  )
}
