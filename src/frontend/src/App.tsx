import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import MarketingPage from './pages/MarketingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const { identity } = useInternetIdentity();

  // Simple hash-based routing
  const currentHash = window.location.hash;
  const isAdminRoute = currentHash.startsWith('#/admin') || currentHash.startsWith('#admin');

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      // Force re-render on hash change
      window.dispatchEvent(new Event('hashchange'));
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Route to appropriate page
  if (isAdminRoute) {
    return <AdminDashboardPage />;
  }

  return <MarketingPage />;
}
