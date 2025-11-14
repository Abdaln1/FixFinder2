import React, { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Jobs(){
  const [jobs, setJobs] = useState([])
  const [msg, setMsg] = useState('')

  async function load(){
    try{
      const r = await api.get('/jobs')
      setJobs(r.data || [])
    }catch(e){
      setMsg('Kunne ikke hente jobber')
    }
  }

  useEffect(()=>{ load() },[])

  async function assign(id){
    setMsg('')
    try{
      await api.post(`/jobs/${id}/assign`)
      await load()
    }catch(e){ setMsg(e.response?.data?.message || 'Feil ved tildeling') }
  }

  async function complete(id){
    setMsg('')
    try{
      await api.post(`/jobs/${id}/complete`)
      await load()
    }catch(e){ setMsg(e.response?.data?.message || 'Feil ved ferdigstilling') }
  }

  async function rate(id){
    setMsg('')
    try{
      const val = window.prompt('Gi en vurdering (1-5) til hjelperen for denne jobben:')
      if (!val) return
      const n = Number(val)
      if (!n || n < 1 || n > 5) { setMsg('Ugyldig vurdering, bruk 1-5'); return }
      await api.post(`/jobs/${id}/rate`, { rating: n })
      await load()
    }catch(e){ setMsg(e.response?.data?.message || 'Feil ved sending av vurdering') }
  }

  const current = (() => {
    try { return JSON.parse(localStorage.getItem('ff_user') || 'null') } catch { return null }
  })()

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Nylige jobber</h2>
      {msg && <div className="mb-3 text-sm text-red-600">{msg}</div>}
      <div className="space-y-3">
        {jobs.length===0 && <p className="text-muted">Ingen jobber funnet (backend må kjøre).</p>}
        {jobs.map(j=> (
          <div key={j._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold">{j.title}</div>
                <div className="text-sm text-gray-600">{j.description}</div>
                <div className="text-xs text-gray-500 mt-1">Status: {j.status}</div>
                {j.createdBy && <div className="text-xs text-gray-500">Publisert av: {j.createdBy.name || j.createdBy.email}</div>}
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="font-semibold">{j.price ? j.price + ' kr' : 'Avtales'}</div>
                {j.status === 'open' && current && (
                  <button onClick={()=>assign(j._id)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Ta jobben</button>
                )}
                {j.status === 'assigned' && j.assignedTo && current && j.assignedTo && j.assignedTo._id === current.id && (
                  <button onClick={()=>complete(j._id)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Marker som ferdig</button>
                )}
                {j.status === 'done' && current && j.createdBy && j.createdBy._id === current.id && !j.rated && (
                  <button onClick={()=>rate(j._id)} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">Gi tilbakemelding</button>
                )}
                {j.status === 'done' && j.rated && (
                  <div className="text-sm text-gray-600">Vurdering: {j.rating} / 5</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
