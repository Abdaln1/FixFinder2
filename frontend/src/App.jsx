import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import PostJob from './pages/PostJob'
import Profile from './pages/Profile'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">FixFinder</Link>
          <nav className="space-x-4 flex items-center">
            <Link to="/jobs" className="text-sm">Jobber</Link>
            <Link to="/post-job" className="text-sm">Legg ut jobb</Link>
            <Link to="/profile" className="text-sm">Min profil</Link>
            <Link to="/checkout" className="text-sm">Betaling</Link>
            <Link to="/login" className="text-sm">Logg inn</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/post-job" element={<PostJob/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
