import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type Props = { lat: number; lng: number; label?: string }

// Work around TS prop typing friction from react-leaflet by casting components to any
const AnyMapContainer: any = MapContainer as any
const AnyTileLayer: any = TileLayer as any
const AnyCircleMarker: any = CircleMarker as any

export default function MapLeaflet({ lat, lng, label = 'Pickup location' }: Props) {
  const position: [number, number] = [lat, lng]
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border">
      <AnyMapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <AnyTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AnyCircleMarker center={position} radius={10} pathOptions={{ color: '#2563eb' }}>
          <Popup>{label}</Popup>
        </AnyCircleMarker>
      </AnyMapContainer>
    </div>
  )
}
