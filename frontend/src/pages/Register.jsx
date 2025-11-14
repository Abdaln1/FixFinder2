import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHelper, setIsHelper] = useState(false)
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault(); setErr('')
    try{
      const res = await api.post('/auth/register', { name, email, password, isHelper })
      if (res.data?.token){
        localStorage.setItem('ff_token', res.data.token)
        localStorage.setItem('ff_user', JSON.stringify(res.data.user || {}))
        nav('/')
      }
    }catch(e){
      setErr(e.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registrer</h2>
      <form onSubmit={submit}>
        <label className="block mb-2">Navn</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Passord</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="flex items-center gap-2 mb-3"><input type="checkbox" checked={isHelper} onChange={e=>setIsHelper(e.target.checked)} /> Registrer som hjelper</label>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Opprett konto</button>
          <button type="button" onClick={()=>nav('/login')} className="px-4 py-2 border rounded">Tilbake</button>
        </div>
        {err && <div className="mt-3 text-red-600">{err}</div>}
      </form>
    </div>
  )
}
