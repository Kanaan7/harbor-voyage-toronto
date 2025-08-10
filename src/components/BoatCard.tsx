import React from 'react'
import { Boat } from '../types'

type Props = { boat: Boat; onClick?: () => void }

export default function BoatCard({ boat, onClick }: Props) {
  // We don't have images yet; use the repo's public/placeholder.svg
  const imgSrc = '/placeholder.svg'

  return (
    <div
      className="group rounded-2xl overflow-hidden border bg-white hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={boat.title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-medium shadow">
          ${boat.price_per_hour}/hr
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug line-clamp-2">
            {boat.title}
          </h3>
          {/* Tiny inline star icon (no extra deps) */}
          <span className="shrink-0 inline-flex items-center text-xs text-amber-600">
            <svg width="14" height="14" viewBox="0 0 24 24" className="mr-0.5">
              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.172L12 18.896l-7.336 3.873 1.402-8.172L.132 9.211l8.2-1.193z" fill="currentColor"/>
            </svg>
            New
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{boat.description}</p>

        <div className="mt-2 text-xs text-gray-500">
          Capacity {boat.capacity} • {boat.location}
        </div>

        {boat.features?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {boat.features.slice(0, 4).map(f => (
              <span key={f} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
