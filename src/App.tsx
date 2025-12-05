import { Routes, Route, Navigate } from 'react-router-dom';
import MaintenancePage from './components/MaintenancePage';
import AutoVerificationPage from './components/AutoVerificationPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MaintenancePage />} />
      <Route path="/cadastro" element={<AutoVerificationPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
