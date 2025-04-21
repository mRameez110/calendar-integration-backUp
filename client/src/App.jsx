import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './components/Home';
import AccountManager from './components/AccountManager';
import AuthButton from './components/AuthButton';
import { showSuccessToast } from './api/messageHandling';



const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('auth_token');
    if (token) {
      localStorage.setItem('auth_token', token);
      setIsAuthenticated(true);
      showSuccessToast("Connected Successfully");
      navigate('/home', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="accounts" element={<AccountManager setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/auth/google" element={<AuthButton setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/auth/google" replace />} />
        </>
      )}
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
