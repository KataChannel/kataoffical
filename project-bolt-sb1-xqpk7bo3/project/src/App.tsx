import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Links from './pages/Links';
import Commissions from './pages/Commissions';
import Payments from './pages/Payments';
import Creatives from './pages/Creatives';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for demo purposes

  return (
    <Router>
      <UserProvider>
        <NotificationProvider>
          {isAuthenticated ? (
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/links" element={<Links />} />
                <Route path="/commissions" element={<Commissions />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/creatives" element={<Creatives />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          ) : (
            <Routes>
              <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            </Routes>
          )}
        </NotificationProvider>
      </UserProvider>
    </Router>
  );
}

export default App;