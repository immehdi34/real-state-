import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function HomePage({ properties = [], onSelectProperty, setCurrentView }) {
  const [locationFilter, setLocationFilter] = useState('All Cities');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [priceFilter, setPriceFilter] = useState('Any Price');
  const [bedsFilter, setBedsFilter] = useState('Any Beds');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setCurrentView({
      page: 'properties',
      filter: {
        city: locationFilter !== 'All Cities' ? locationFilter : '',
        property_type: typeFilter !== 'All Types' ? typeFilter : '',
        beds: bedsFilter !== 'Any Beds' ? bedsFilter.replace('+ Beds', '') : ''
      }
    });
  };

  const featuredListings = properties.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[780px] lg:min-h-[860px] flex items-center justify-center bg-slate-950 text-white px-6 sm:px-8 overflow-hidden pt-20">
        {/* Background Image with Twilight Glow */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-skFQy5BiU1_8LiR7oEXLOx8yAb0R3WoakTYQPKGr7lQhBEI0oibawEaiLQMYW8RkvdG-noifbeMmt08SONuVPyUXHdR5ffU0pIylMnAq0_wQJoTUUwkDsJ5oskqnoJouJDwBw9US49ZOhAihCRMutUJ3G-t8pyUA5k81G-2pMTV_d5ymsJr2aRNgp7mbH6rWPl5MMpUC4hN3Qks_2tLRgkMcv094vgvZfADyoT5KaC21-S6plSs')`
          }}
        ></div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center py-16 space-y-8">
          {/* Top Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Premier American Real Estate
          </div>

          {/* Main Title */}
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Find Your Dream <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-emerald-400">
              American Home
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore exceptional residences in the nation's most coveted metropolitan markets with unmatched transparency and expert advisory.
          </p>

          {/* Advanced Multi-Parameter Search Bar (From Stitch Home Screen) */}
          <form 
            onSubmit={handleHeroSearch}
            className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-slate-900 border border-slate-100"
          >
            {/* Location */}
            <div className="flex flex-col text-left px-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</label>
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All Cities</option>
                <option>Beverly Hills</option>
                <option>New York</option>
                <option>Miami</option>
                <option>Aspen</option>
                <option>Austin</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="flex flex-col text-left px-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Property Type</label>
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All Types</option>
                <option>Modern Villa</option>
                <option>Penthouse</option>
                <option>Waterfront Estate</option>
                <option>Suburban Estate</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex flex-col text-left px-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Price Range</label>
              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Any Price</option>
                <option>$5M - $10M</option>
                <option>$10M - $15M</option>
                <option>$15M+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col text-left px-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bedrooms</label>
              <select 
                value={bedsFilter}
                onChange={(e) => setBedsFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200/80 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Any Beds</option>
                <option>3+ Beds</option>
                <option>4+ Beds</option>
                <option>5+ Beds</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end px-2">
              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-xs sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
              100% Verified Ownership Titles
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">lock</span>
              Discreet Escrow & Privacy
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">support_agent</span>
              Direct Advisor Representation
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES (From Stitch Screen 09) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">Curated Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Featured Landmark Residences</h2>
          </div>
          <button 
            onClick={() => setCurrentView({ page: 'properties' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>View All Properties ({properties.length})</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((prop) => (
            <PropertyCard 
              key={prop.id} 
              property={prop} 
              onSelect={onSelectProperty} 
            />
          ))}
        </div>
      </section>

      {/* 3. LUXURY CATEGORIES SECTION */}
      <section className="bg-slate-100/70 py-24 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-600">Architectural Typologies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Explore by Category</h2>
            <p className="text-slate-600 text-sm">Discover distinct architectural masterpieces crafted for discerning lifestyles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Modern Villas',
                count: '3 Residences',
                type: 'Modern Villa',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3csgon6qfoJXjy6-1H-uHzdwY1bpqRKEEdGNgZHRthIjiPt-GYUyb0O5tqnU7M7WCJ3RAugEWyOsSOzVfXjcneKmlNdSZE86BFPB1Kmku6koI6DTeukTs1J7DuBFMNrJ53Qnz-y_RFXXYmJOYeIPDd6bYB9BohtsZpifbeltV0hdkhk4bEC3GFaUuexAJeiR2ZNfMW6SsfQVyYkv689ADyA2He9s6pabqi6S7lxhoeAzORhYF-yA'
              },
              {
                title: 'Sky Penthouses',
                count: '2 Residences',
                type: 'Penthouse',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFm2PJRapqzbqJpll-v5DJhE2fh3MCu60Nx8IeSFrG_vKbEQfIO5_kcY_3WD2Fg952pF4lJ-mbTPX9VR3en4_Hfj80uGJ0T17VZw_90FtdpPLofwkd2IS0l05loVSMKuDlfeIzS9vPmSafu-7li70kCcDI8qzJaaAGcYncXbONqB4PtRn3QaP_0C5VPYWN-brU1K3yKoiMxD0_AGWyYeyGJVeOHWlBAVNkezcY2ds8iS4k2BeKNec'
              },
              {
                title: 'Waterfront Estates',
                count: '2 Residences',
                type: 'Waterfront Estate',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGz7qnvrP1WLXOIEzaxC5E6uoYXU4S65a2rv6ITbTnMkpJYdADEShvTBRCog5ToGeec6koYxaqY709pl0SntlrlVGWESydyVFqVOwC3-haePrf_qXEICn8OWg90iUXGV7dCJ4548BcvC9XltgEh5XcB_416-NJAJmnrIDYTrdiSQcB2osshMKimuehGc77whQ0T4PL9d00PT0Ed1yyrABxTqF87y25WslwSj9XeW2xlVkedrEUAl4'
              },
              {
                title: 'Gated Enclaves',
                count: '2 Residences',
                type: 'Suburban Estate',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP72VINp5FH7AtZPZsTimWApi8_hnNwvImOguYliCRWYs4EP0U1TdJuM8jsYK63btzZsAOp9Apb6RXjswqR8fnenwzrPGeEziWZWmUaPCeg6Ol-riH04bUcabNbKTxYGOw8qix5tGsotXcwfbGCsUS_amRQQnvnIM9Meo_ecqFNCPAj-7Eh-x2xsYWt2geSC7FtcG5roZc60FQiCUbn9F-svkMq_dQNOkl5wHbolavS7wO-CtuEUY'
              }
            ].map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentView({ page: 'properties', filter: { property_type: cat.type } })}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-slate-200 hover:border-slate-400 transition-colors"
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs text-emerald-400 font-semibold">{cat.count}</span>
                  <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MARKET AUTHORITY STATS */}
      <section className="bg-slate-950 text-white py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">$4.2B+</span>
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium">Closed Sales Volume</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">98.4%</span>
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium">Client Retention</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight">14 Days</span>
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium">Average Market Velocity</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Top 1%</span>
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-medium">Nationwide Advisory Ranking</p>
          </div>
        </div>
      </section>
    </div>
  );
}
