import React from 'react'
import type { Boat } from '../types'

type Props = { boat: Boat; onClick?: () => void }
export default function BoatCard({ boat, onClick }: Props) {
  return (
    <div className="rounded-2xl border p-4 hover:shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{boat.title}</h3>
        <span className="text-sm font-medium">${boat.price_per_hour}/hr</span>
      </div>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{boat.description}</p>
      <div className="mt-2 text-xs text-gray-500">
        Capacity: {boat.capacity} • {boat.location}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {boat.features?.slice(0,4).map((f) => (
          <span key={f} className="text-xs bg-gray-100 px-2 py-1 rounded">{f}</span>
        ))}
      </div>
    </div>
  )
}
