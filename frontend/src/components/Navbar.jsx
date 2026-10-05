import React, { useState } from 'react';

export default function Navbar({ currentView, setCurrentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'admin', label: 'Admin Dashboard' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_12px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView({ page: 'home' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 border border-slate-800">
            <span className="material-symbols-outlined text-[24px]">villa</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-tight text-slate-900 font-sans">AuraEstates</span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-semibold -mt-1">American Luxury</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/50">
          {navItems.map((item) => {
            const isActive = currentView.page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView({ page: item.id })}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView({ page: 'post-property' })}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Post Property
          </button>

          {/* User Avatar */}
          <div 
            onClick={() => setCurrentView({ page: 'admin' })}
            title="Admin Profile"
            className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2 animate-fadeIn shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView({ page: item.id });
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
                currentView.page === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentView({ page: 'post-property' });
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Post Property
          </button>
        </div>
      )}
    </header>
  );
}
