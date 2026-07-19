import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// Pehle line check karein, usme Routes aur Route hona chahiye:
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login'
import LoginGate from './features/auth/LoginGate'
import Sidebar from './component/Sidebar'
import TopBar from './component/TopBar'
import MainLayout from './component/MainLayout'

function App() {

  return (
    <>
     
      <Routes>
        <Route path="/" element={<LoginGate />} />

        <Route path="/dashboard" element={<MainLayout />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   
    </>
  )
}

export default App
