import React from 'react';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md">
                <span className="material-symbols-outlined text-[24px]">villa</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">AuraEstates</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Curating America's most prestigious architectural landmarks and high-yield metropolitan estates with discreet client representation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-xs text-emerald-400 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Supabase & Express Powered
              </span>
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Prime Markets</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { city: 'Beverly Hills' } })} className="hover:text-emerald-400 transition-colors">Beverly Hills, CA</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { city: 'New York' } })} className="hover:text-emerald-400 transition-colors">Manhattan, NY</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { city: 'Miami' } })} className="hover:text-emerald-400 transition-colors">Miami Beach, FL</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { city: 'Aspen' } })} className="hover:text-emerald-400 transition-colors">Aspen, CO</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { city: 'Austin' } })} className="hover:text-emerald-400 transition-colors">Austin, TX</button></li>
            </ul>
          </div>

          {/* Portfolios */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { property_type: 'Modern Villa' } })} className="hover:text-emerald-400 transition-colors">Modernist Villas</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { property_type: 'Penthouse' } })} className="hover:text-emerald-400 transition-colors">Sky Penthouses</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { property_type: 'Waterfront Estate' } })} className="hover:text-emerald-400 transition-colors">Waterfront & Islands</button></li>
              <li><button onClick={() => setCurrentView({ page: 'properties', filter: { property_type: 'Suburban Estate' } })} className="hover:text-emerald-400 transition-colors">Gated Enclaves</button></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Advisory Desk</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">phone</span>
                +1 (800) 489-AURA
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">mail</span>
                concierge@auraestates.com
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">location_on</span>
                Beverly Hills & Manhattan
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AuraEstates Inc. All rights reserved. Equal Housing Opportunity.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">MLS Regulatory Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
