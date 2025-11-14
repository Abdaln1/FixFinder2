import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function PostJob(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault(); setMsg('')
    try{
      const res = await api.post('/jobs', { title, description, price: price ? Number(price) : undefined })
      setMsg('Jobb opprettet')
      nav('/jobs')
    }catch(err){
      setMsg('Feil: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Legg ut jobb</h2>
      <form onSubmit={submit}>
        <label className="block mb-2">Tittel</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Beskrivelse</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Pris (NOK)</label>
        <input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Publiser jobb</button>
        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </form>
    </div>
  )
}
