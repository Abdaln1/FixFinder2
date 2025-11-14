import React, { useEffect, useState } from 'react'
import api from '../utils/api'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [msg, setMsg] = useState('')

  async function load(){
    try{
      const r = await api.get('/auth/me')
      setUser(r.data)
      setName(r.data.name || '')
      setBio(r.data.bio || '')
    }catch(e){ setMsg('Kunne ikke laste profil') }
  }

  useEffect(()=>{ load() },[])

  async function save(){
    setMsg('')
    try{
      const r = await api.put('/users/me', { name, bio })
      setUser(r.data)
      localStorage.setItem('ff_user', JSON.stringify(r.data))
      setMsg('Oppdatert')
    }catch(e){ setMsg('Feil ved oppdatering') }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Min profil</h2>
      <label className="block mb-2">Navn</label>
      <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded mb-3" />
      <label className="block mb-2">Bio</label>
      <textarea value={bio} onChange={e=>setBio(e.target.value)} className="w-full p-2 border rounded mb-3" />
      <div className="flex items-center gap-2">
        <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Lagre</button>
      </div>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  )
}
