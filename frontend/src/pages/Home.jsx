import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="relative overflow-hidden">
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-28">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">FixFinder — hjelp i nærheten, raskt og trygt</h1>
            <p className="mt-4 text-lg opacity-90">Trenger du hjelp med småjobber? Finn lokale hjelpere for flytting, snømåking, montering og mer. Eller tjen ekstra penger som en Fixer.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/post-job" className="px-5 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:scale-105 transform transition">Legg ut jobb</Link>
              <Link to="/jobs" className="px-5 py-3 border border-white/40 text-white rounded hover:bg-white/10 transition">Se jobber</Link>
            </div>
            <div className="mt-6 text-sm opacity-80">Trygt møtested for lokale småjobber — start i din by.</div>
          </div>
          <div className="flex-1">
            <div className="bg-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-md animate-float">
              <div className="text-sm uppercase tracking-wide opacity-90">Siste jobber</div>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center justify-between bg-white/10 p-3 rounded">
                  <span className="font-medium">Flyttehjelp - 2 timer</span>
                  <span className="text-sm">500 kr</span>
                </li>
                <li className="flex items-center justify-between bg-white/10 p-3 rounded">
                  <span className="font-medium">Snømåking - oppkjørsel</span>
                  <span className="text-sm">200 kr</span>
                </li>
                <li className="flex items-center justify-between bg-white/10 p-3 rounded">
                  <span className="font-medium">Montere hyller</span>
                  <span className="text-sm">Avtales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes float {0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
        .animate-float{animation:float 4s ease-in-out infinite}
      `}</style>
      <section className="max-w-5xl mx-auto p-6 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow px-6 py-6">
          <h2 className="text-xl font-semibold mb-3">Hvordan det fungerer</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <div className="font-bold">1. Legg ut jobb</div>
              <div className="text-sm text-gray-600 mt-2">Beskriv jobben og sett pris eller "Avtales".</div>
            </div>
            <div className="p-4 border rounded">
              <div className="font-bold">2. Finn en hjelper</div>
              <div className="text-sm text-gray-600 mt-2">Se lokale profiler, vurderinger og tilgjengelighet.</div>
            </div>
            <div className="p-4 border rounded">
              <div className="font-bold">3. Avtal og betal</div>
              <div className="text-sm text-gray-600 mt-2">Sikker betaling og etterlat en vurdering når jobben er gjort.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
