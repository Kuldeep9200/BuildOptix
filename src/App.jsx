import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import LoginGate from './features/auth/LoginGate';
import Sidebar from './component/Sidebar';
import TopBar from './component/TopBar';
import MainLayout from './component/MainLayout';
import StatusBar from './component/StatusBar';
import AiAssistantPanel from './component/AiAssistantPanel';
import EquipmentView from './component/EquipmentView';

function App() {
  return (
    <> {/* StatusBar ki height ke barabar space offset taaki content na chhupe */}
      <Routes>
        <Route path="/" element={<LoginGate />} />
        <Route path="/dashboard" element={<MainLayout />} />
        <Route path="/equipment" element={<EquipmentView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Routes ke bahar rakha hai taaki crash na ho */}
      <StatusBar />
      <AiAssistantPanel/>
    </>
  );
}

export default App;