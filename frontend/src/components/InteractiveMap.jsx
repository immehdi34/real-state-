import React, { useState } from 'react';

export default function InteractiveMap({ propertyAddress = "1248 Vista Ridge Lane, Beverly Hills, CA 90210", initialLat = 34.0928, initialLng = -118.4004 }) {
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 45 });
  const [coords, setCoords] = useState({ lat: initialLat, lng: initialLng });
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPinPosition({ x, y });
    
    // Slight jitter to mock lat/lng update based on click position
    const deltaLat = ((50 - y) * 0.002).toFixed(4);
    const deltaLng = ((x - 50) * 0.002).toFixed(4);
    setCoords({
      lat: (Number(initialLat) + Number(deltaLat)).toFixed(4),
      lng: (Number(initialLng) + Number(deltaLng)).toFixed(4)
    });
  };

  const handleSaveLocation = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-slate-900">Location & Neighborhood</h3>
          <p className="text-xs text-slate-500">Interactive geographic parcel & zoning boundary</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span>Lat: {coords.lat}</span>
          <span>•</span>
          <span>Lng: {coords.lng}</span>
        </div>
      </div>

      <div 
        onClick={handleMapClick}
        className="w-full h-80 sm:h-96 rounded-2xl relative overflow-hidden shadow-inner cursor-crosshair border border-slate-200 group bg-slate-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Subtle grid overlay to give sophisticated architectural map look */}
        <div className="absolute inset-0 bg-slate-950/25 backdrop-contrast-125"></div>

        {/* Dynamic Location Pin */}
        <div 
          className="absolute transition-all duration-200 pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ top: `${pinPosition.y}%`, left: `${pinPosition.x}%` }}
        >
          <div className="flex flex-col items-center">
            <span 
              className="material-symbols-outlined text-emerald-400 text-[42px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
          </div>
          <div className="w-3 h-1.5 bg-emerald-500/60 rounded-full mx-auto -mt-1.5"></div>
        </div>

        {/* Top Hint Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-sm text-xs font-medium text-slate-700 flex items-center gap-1.5 pointer-events-none border border-slate-200/50">
          <span className="material-symbols-outlined text-emerald-600 text-[16px]">touch_app</span>
          <span>Click anywhere to adjust marker</span>
        </div>

        {/* Bottom Floating Bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-100">
          <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">home_pin</span>
            </div>
            <span className="text-sm font-semibold text-slate-800 truncate">
              {propertyAddress}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSaveLocation();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">
              {savedFeedback ? 'check_circle' : 'bookmark'}
            </span>
            <span>{savedFeedback ? 'Coordinates Saved!' : 'Save Landmark'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
