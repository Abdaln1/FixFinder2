import React, { useState } from 'react'
import axios from 'axios'

export default function Checkout(){
  const [amount, setAmount] = useState(100)
  const [clientSecret, setClientSecret] = useState('')
  const [msg, setMsg] = useState('')

  async function createIntent(e){
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:4000/api/payments/create-payment-intent', { amount })
      setClientSecret(res.data.clientSecret || '')
      setMsg('Client secret received (placeholder). Implement Stripe.js to complete payment.')
    }catch(err){
      setMsg('Error: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Betaling (placeholder)</h2>
      <form onSubmit={createIntent}>
        <label className="block mb-2">Beløp (NOK)</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full p-2 border rounded mb-3" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Opprett betalings-intent</button>
      </form>
      {clientSecret && <div className="mt-4 text-sm text-green-700">{clientSecret}</div>}
      {msg && <div className="mt-2 text-sm text-gray-700">{msg}</div>}
    </div>
  )
}
