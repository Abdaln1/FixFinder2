import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setErr('')
    try{
      const res = await api.post('/auth/login', { email, password })
      if (res.data?.token){
        localStorage.setItem('ff_token', res.data.token)
        localStorage.setItem('ff_user', JSON.stringify(res.data.user || {}))
        nav('/')
      }
    }catch(e){
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Logg inn</h2>
      <form onSubmit={submit}>
        <label className="block mb-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <label className="block mb-2">Passord</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Logg inn</button>
          <button type="button" onClick={()=>{nav('/register')}} className="px-4 py-2 border rounded">Registrer</button>
        </div>
        {err && <div className="mt-3 text-red-600">{err}</div>}
      </form>
    </div>
  )
}
