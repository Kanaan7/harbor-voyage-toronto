import React, { useRef } from 'react'

type Props = { onSelected: (files: File[]) => void }
export default function ImageUploader({ onSelected }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="border rounded-2xl p-4">
      <p className="text-sm mb-2">Images (drag & drop coming later)</p>
      <input ref={ref} type="file" multiple accept="image/*" onChange={(e) => onSelected(Array.from(e.target.files ?? []))}/>
    </div>
  )
}
