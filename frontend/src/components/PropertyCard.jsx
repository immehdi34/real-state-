import React, { useState } from 'react';

export default function PropertyCard({ property, onSelect }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={() => onSelect(property.id)}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-400 transition-colors duration-150 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.status && (
            <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wider font-bold shadow-sm ${
              property.status === 'Exclusive' 
                ? 'bg-slate-900 text-white' 
                : property.status === 'Open House'
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              {property.status}
            </span>
          )}
          {property.featured && (
            <span className="bg-emerald-500/90 backdrop-blur-md text-slate-950 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            isFavorite 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title="Save to Favorites"
        >
          <span 
            className="material-symbols-outlined text-[18px]" 
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Price Pill */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg">
          <span className="font-bold text-lg text-emerald-400">
            {property.price_formatted || `$${Number(property.price).toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">location_on</span>
            {property.location}
          </p>
        </div>

        {/* Specs bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-slate-400">king_bed</span>
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-slate-400">bathtub</span>
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-slate-400">square_foot</span>
            <span>{Number(property.sqft).toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-5">
          <button 
            className="w-full bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-800 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2 border border-slate-200"
          >
            <span>Explore Residence</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
