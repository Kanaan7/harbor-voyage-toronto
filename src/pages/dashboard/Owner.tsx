import React, { useEffect, useState } from 'react'
import { supabase } from '../../integrations/supabase/client'
import type { Boat } from '../../types'
import { listBoats } from '../../lib/supabase/boats'
import ImageUploader from '../../components/ImageUploader'

export default function OwnerDashboard() {
  const [boats, setBoats] = useState<Boat[]>([])
  const [uid, setUid] = useState<string>('')

  useEffect(() => {
    supabase.auth.getUser().then(r => setUid(r.data.user?.id ?? ''))
  }, [])

  useEffect(() => {
    if (!uid) return
    listBoats().then(all => setBoats(all.filter(b => b.owner_id === uid)))
  }, [uid])

  async function uploadImages(boatId: string, files: File[]) {
    if (!uid || files.length === 0) return
    const urls: string[] = []
    for (const file of files) {
      const path = `${uid}/${boatId}/${Date.now()}-${file.name}`
      const { error: upErr } = await supabase.storage.from('boat-images').upload(path, file)
      if (upErr) throw upErr
      const { data } = supabase.storage.from('boat-images').getPublicUrl(path)
      if (data?.publicUrl) urls.push(data.publicUrl)
    }
    const { data: current } = await supabase
      .from('boat_listings')
      .select('images')
      .eq('id', boatId)
      .maybeSingle()
    const next = [ ...(current?.images ?? []), ...urls ]
    await supabase.from('boat_listings').update({ images: next }).eq('id', boatId)
    // refresh
    listBoats().then(all => setBoats(all.filter(b => b.owner_id === uid)))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Owner dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {boats.map(b => (
          <div key={b.id} className="border rounded-2xl p-4">
            <div className="font-semibold">{b.title}</div>
            <div className="text-sm text-gray-600">${b.price_per_hour}/hr • {b.capacity} • {b.location}</div>
            <ImageUploader onSelected={(files) => uploadImages(b.id, files)} />
          </div>
        ))}
      </div>
    </div>
  )
}
