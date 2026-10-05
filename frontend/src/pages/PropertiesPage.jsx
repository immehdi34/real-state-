import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function PropertiesPage({ properties = [], onSelectProperty, initialFilters = {} }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialFilters.city || 'All');
  const [selectedType, setSelectedType] = useState(initialFilters.property_type || 'All');
  const [priceTier, setPriceTier] = useState('All');
  const [minBeds, setMinBeds] = useState(initialFilters.beds || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Search text
      if (search) {
        const q = search.toLowerCase();
        const matches =
          prop.title.toLowerCase().includes(q) ||
          prop.location.toLowerCase().includes(q) ||
          prop.city.toLowerCase().includes(q) ||
          prop.description?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // City
      if (selectedCity !== 'All' && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      // Type
      if (selectedType !== 'All' && prop.property_type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      // Price Tier
      if (priceTier === 'under-10m' && prop.price >= 10000000) return false;
      if (priceTier === '10m-15m' && (prop.price < 10000000 || prop.price > 15000000)) return false;
      if (priceTier === 'above-15m' && prop.price <= 15000000) return false;

      // Beds
      if (minBeds !== 'All') {
        const b = parseInt(minBeds);
        if (prop.bedrooms < b) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'sqft') return b.sqft - a.sqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, search, selectedCity, selectedType, priceTier, minBeds, sortBy]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCity('All');
    setSelectedType('All');
    setPriceTier('All');
    setMinBeds('All');
    setSortBy('featured');
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-6 sm:px-8 space-y-8 animate-fadeIn">
      {/* 1. Header & View Mode Switcher (From Stitch Screen 01) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">
            Curated Listings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-3">
            Exclusive American Estates
            <span className="text-slate-400 text-lg font-normal">
              ({filteredProperties.length} results)
            </span>
          </h1>
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              <span>Map View</span>
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft">Living Area (Sq Ft)</option>
          </select>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Keyword</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 pl-9 pr-3 py-2 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-3 top-2.5">search</span>
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Metropolitan Market</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Cities</option>
            <option value="Beverly Hills">Beverly Hills, CA</option>
            <option value="New York">Manhattan, NY</option>
            <option value="Miami">Miami Beach, FL</option>
            <option value="Aspen">Aspen, CO</option>
            <option value="Austin">Austin, TX</option>
          </select>
        </div>

        {/* Typology */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Architecture Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Types</option>
            <option value="Modern Villa">Modern Villa</option>
            <option value="Penthouse">Sky Penthouse</option>
            <option value="Waterfront Estate">Waterfront Estate</option>
            <option value="Suburban Estate">Suburban Estate</option>
          </select>
        </div>

        {/* Price Tier */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Price Bracket</label>
          <select
            value={priceTier}
            onChange={(e) => setPriceTier(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Price Tiers</option>
            <option value="under-10m">Under $10,000,000</option>
            <option value="10m-15m">$10M to $15,000,000</option>
            <option value="above-15m">$15,000,000+</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        <div className="flex items-end">
          <button
            onClick={clearAllFilters}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* 3. Main Views */}
      {viewMode === 'grid' ? (
        filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">home_work</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No matching residences found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your price range, selected city, or keyword search criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
            >
              Reset All Filters
            </button>
          </div>
        )
      ) : (
        /* MAP VIEW MODE */
        <div className="space-y-6">
          <div 
            className="w-full h-[550px] rounded-3xl relative overflow-hidden shadow-lg border border-slate-200 bg-slate-900"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1800&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-slate-950/30 backdrop-contrast-125"></div>

            {/* Interactive Pins on Map */}
            {filteredProperties.map((prop, idx) => {
              // Normalized pin coordinates across the canvas
              const positions = [
                { top: '35%', left: '25%' },
                { top: '48%', left: '42%' },
                { top: '65%', left: '72%' },
                { top: '30%', left: '60%' },
                { top: '55%', left: '20%' },
                { top: '40%', left: '80%' },
              ];
              const pos = positions[idx % positions.length];
              const isSelected = selectedMapProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedMapProperty(prop)}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                >
                  <div className={`px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 border transition-colors ${
                    isSelected 
                      ? 'bg-emerald-500 text-slate-950 border-white' 
                      : 'bg-slate-900/90 text-white border-white/20 hover:bg-slate-900'
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{prop.price_formatted}</span>
                  </div>
                </div>
              );
            })}

            {/* Selected Property Overlay Card */}
            {selectedMapProperty && (
              <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-100 flex gap-4 animate-fadeIn z-20">
                <img
                  src={selectedMapProperty.image}
                  alt={selectedMapProperty.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 block">{selectedMapProperty.price_formatted}</span>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{selectedMapProperty.title}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{selectedMapProperty.location}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => onSelectProperty(selectedMapProperty.id)}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setSelectedMapProperty(null)}
                      className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
