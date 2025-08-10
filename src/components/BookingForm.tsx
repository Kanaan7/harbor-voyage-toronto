import React, { useState } from 'react'
import { createBooking } from '../lib/supabase/bookings'

type Props = { boatId: string; userId: string; pricePerHour?: number }
export default function BookingForm({ boatId, userId, pricePerHour }: Props) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const estimate = React.useMemo(() => {
    if (!start || !end || !pricePerHour) return null
    const s = new Date(start)
    const e = new Date(end)
    const hours = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60)))
    return { hours, total: hours * pricePerHour }
  }, [start, end, pricePerHour])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null); setSuccess(null)
    try {
      await createBooking({ boat_id: boatId, customer_id: userId, start_time: start, end_time: end, notes })
      setSuccess('Request sent! We\'ll email you once the owner responds.')
      setStart(''); setEnd(''); setNotes('')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 border rounded-2xl p-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">Start
          <input type="datetime-local" className="w-full border rounded px-2 py-1" value={start} onChange={e=>setStart(e.target.value)} required/>
        </label>
        <label className="text-sm">End
          <input type="datetime-local" className="w-full border rounded px-2 py-1" value={end} onChange={e=>setEnd(e.target.value)} required/>
        </label>
      </div>
      <label className="text-sm block">Notes
        <textarea className="w-full border rounded px-2 py-1" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any special requests?" />
      </label>
      {estimate && (
        <div className="text-sm text-gray-700">Estimated: {estimate.hours}h • ${'{'}estimate.total{'}'}</div>
      )}
      <button disabled={loading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? 'Sending...' : 'Request to book'}
      </button>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  )
}
