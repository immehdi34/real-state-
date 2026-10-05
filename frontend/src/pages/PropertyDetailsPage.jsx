import React, { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import MortgageCalculator from '../components/MortgageCalculator';
import ScheduleTourModal from '../components/ScheduleTourModal';

export default function PropertyDetailsPage({ property, onBack }) {
  const [selectedImage, setSelectedImage] = useState(property?.image || '');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Property Not Found</h2>
        <button 
          onClick={onBack}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold"
        >
          Return to All Listings
        </button>
      </div>
    );
  }

  const galleryImages = property.gallery?.length ? property.gallery : [property.image];

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-10 animate-fadeIn">
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Properties</span>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-sm"
            title="Share Residence"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button
            onClick={() => setIsTourModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Schedule Private Showing</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Photography Showcase */}
      <div className="space-y-4">
        {/* Main Hero Photo */}
        <div className="relative w-full h-[400px] sm:h-[540px] rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
          <img
            src={selectedImage || property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating Details on Hero */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-md">
                  {property.status || 'Exclusive'}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
                  {property.property_type}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">
                {property.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 flex items-center gap-1.5 drop-shadow">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">location_on</span>
                {property.address || property.location}
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:items-end flex-shrink-0">
              <span className="text-xs text-slate-400 font-medium">Offered Exclusively At</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {property.price_formatted}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Gallery */}
        {galleryImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                  selectedImage === img
                    ? 'border-emerald-500'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Key Architectural Metrics (From Stitch Screen 06) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="flex flex-col items-center justify-center p-2">
          <span className="material-symbols-outlined text-emerald-600 text-[32px] mb-1">king_bed</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{property.bedrooms}</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Bedrooms</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
          <span className="material-symbols-outlined text-emerald-600 text-[32px] mb-1">bathtub</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{property.bathrooms}</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Bathrooms</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
          <span className="material-symbols-outlined text-emerald-600 text-[32px] mb-1">square_foot</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{Number(property.sqft).toLocaleString()}</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Interior Sq Ft</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 pt-4 sm:pt-2">
          <span className="material-symbols-outlined text-emerald-600 text-[32px] mb-1">garage</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{property.garage || 2}</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Vehicle Garage</span>
        </div>
      </div>

      {/* 4. Two-Column Detailed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Description, Amenities, Map, Calculator */}
        <div className="lg:col-span-2 space-y-10">
          {/* Architectural Description */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Architectural Narrative</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Exquisite Amenities */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Exquisite Amenities & Finishes</h3>
            <div className="flex flex-wrap gap-2.5">
              {(property.amenities || [
                'Infinity Pool',
                'Wine Cellar',
                'Smart Home Automation',
                'Panoramic City Views',
                'Private Home Theater',
                'Outdoor Fire Lounge',
                'Private Elevator'
              ]).map((amenity, i) => (
                <span
                  key={i}
                  className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-slate-200/60 transition-colors"
                >
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <InteractiveMap
            propertyAddress={property.address || property.location}
            initialLat={property.lat}
            initialLng={property.lng}
          />

          {/* Mortgage Calculator */}
          <MortgageCalculator initialPrice={property.price} />
        </div>

        {/* Right 1 Col: Advisor Contact Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6 sticky top-28">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                alt="Victoria Sterling"
                className="w-16 h-16 rounded-2xl object-cover shadow-sm"
              />
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 block">Listing Advisor</span>
                <h4 className="text-lg font-bold text-slate-900">Victoria Sterling</h4>
                <p className="text-xs text-slate-500">Principal Partner & Luxury Director</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">phone</span>
                <span className="font-semibold">+1 (310) 849-2201</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">mail</span>
                <span className="font-semibold">victoria.sterling@auraestates.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">verified_user</span>
                <span>Licensed California Broker #01928471</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setIsTourModalOpen(true)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Request Private Tour</span>
              </button>
              
              <button
                onClick={() => alert(`Direct connection established with Victoria Sterling for ${property.title}`)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct Inquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Modal */}
      <ScheduleTourModal
        property={property}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />
    </div>
  );
}
