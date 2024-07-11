import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Login from './Auth/login';
import Dashboard from './pages/dashboard';
import Register from './Auth/register';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (  
    <Router>
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to='/dashboard' />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/dashboard' />} />
        <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} /> {/* Added Navigate to '/login' if not authenticated */}
      </Routes>
    </Router> 
  );
};

export default App;
