import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { api } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState({ page: 'home' });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.getProperties();
      setProperties(res.properties || []);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSelectProperty = (id) => {
    setCurrentView({ page: 'details', id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProperty = currentView.page === 'details'
    ? properties.find(p => p.id === currentView.id || String(p.id) === String(currentView.id))
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased font-sans">
      {/* Top Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1">
        {loading && properties.length === 0 ? (
          <div className="pt-40 pb-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium text-sm">Connecting to AuraEstates Database...</p>
          </div>
        ) : (
          <>
            {currentView.page === 'home' && (
              <HomePage
                properties={properties}
                onSelectProperty={handleSelectProperty}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView.page === 'properties' && (
              <PropertiesPage
                properties={properties}
                onSelectProperty={handleSelectProperty}
                initialFilters={currentView.filter || {}}
              />
            )}

            {currentView.page === 'details' && (
              <PropertyDetailsPage
                property={selectedProperty}
                onBack={() => setCurrentView({ page: 'properties' })}
              />
            )}

            {(currentView.page === 'admin' || currentView.page === 'post-property') && (
              <AdminDashboardPage
                properties={properties}
                onRefresh={fetchProperties}
                onSelectProperty={handleSelectProperty}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Footer */}
      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}
