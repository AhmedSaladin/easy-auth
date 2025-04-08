import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/sign-up.page';
import LoginPage from './pages/login.page';
import ApplicationPage from './pages/home.page';
import ProtectedRoute from './components/protected-route';

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans antialiased text-gray-900">
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <ApplicationPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;