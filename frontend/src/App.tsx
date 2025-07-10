import React, { useState } from 'react';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import { useAuth } from './context/AuthContext.tsx';


function App() {
  const { token, setToken } = useAuth();

  return (
    <div>
      {!token ? (
        <RegistrationPage />
      ) : (
        <Dashboard onLogout={() => setToken(null)} />
      )}
    </div>
  );
}

export default App;
