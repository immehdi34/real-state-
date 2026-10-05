import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AdminDashboardPage({ properties = [], onRefresh, onSelectProperty }) {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'inquiries', 'add', 'supabase'
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [supabaseStatus, setSupabaseStatus] = useState(null);
  const [savingSupabase, setSavingSupabase] = useState(false);

  // Form State for New Property
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    price: '',
    location: '',
    city: 'Beverly Hills',
    state: 'CA',
    address: '',
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 5000,
    garage: 2,
    property_type: 'Modern Villa',
    status: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    amenities: 'Infinity Pool, Wine Cellar, Smart Home Automation'
  });

  const loadData = async () => {
    try {
      const [statsRes, inqRes] = await Promise.all([
        api.getStats(),
        api.getInquiries()
      ]);
      setStats(statsRes.stats);
      setInquiries(inqRes.inquiries || []);
      if (statsRes.database) {
        setSupabaseStatus(statsRes.database);
        if (statsRes.database.url) setSupabaseUrl(statsRes.database.url);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  const handleSaveSupabase = async (e) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey) {
      alert('Please provide both your Supabase Project URL and API Key.');
      return;
    }
    setSavingSupabase(true);
    try {
      const res = await api.updateSupabaseConfig(supabaseUrl, supabaseKey);
      if (res.success) {
        setFeedback('✅ Supabase connected and synced successfully!');
        setSupabaseStatus(res.status);
        onRefresh();
        loadData();
      } else {
        alert(res.error || 'Failed to connect. Please verify your Supabase URL format.');
      }
    } catch (err) {
      alert('Error updating Supabase connection');
    } finally {
      setSavingSupabase(false);
      setTimeout(() => setFeedback(''), 4000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this property listing?')) return;
    try {
      await api.deleteProperty(id);
      setFeedback('Listing deleted successfully.');
      onRefresh();
      loadData();
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      alert('Error deleting property');
    }
  };

  const handleStatusChange = async (inqId, newStatus) => {
    try {
      await api.updateInquiryStatus(inqId, newStatus);
      loadData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amenitiesArr = formData.amenities.split(',').map(s => s.trim()).filter(Boolean);
      await api.createProperty({
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft: Number(formData.sqft),
        garage: Number(formData.garage),
        amenities: amenitiesArr,
        gallery: [formData.image]
      });

      setFeedback('✨ New luxury listing successfully published!');
      onRefresh();
      loadData();
      setActiveTab('listings');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      alert('Error creating listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 block mb-1">
            Brokerage Management System
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Executive Admin Portal
          </h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 overflow-x-auto">
          {[
            { id: 'listings', label: 'Portfolio', icon: 'villa' },
            { id: 'inquiries', label: 'Tour Inquiries', icon: 'calendar_month' },
            { id: 'add', label: 'Add Listing', icon: 'add_circle' },
            { id: 'supabase', label: 'Cloud & Supabase', icon: 'cloud_sync' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-sm font-semibold border border-emerald-200 flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
          <span>{feedback}</span>
        </div>
      )}

      {/* KPI Stats Cards (From Stitch Screen 03 & 10) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">Active Listings</span>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats ? stats.activeListings : properties.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Live in Portfolio
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">Total Portfolio Value</span>
          <div className="text-3xl font-extrabold text-emerald-600">
            {stats ? stats.totalVolumeFormatted : '$65.6M'}
          </div>
          <span className="text-[11px] text-slate-400">Gross Aggregate</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">Tour Inquiries</span>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats ? stats.totalInquiries : inquiries.length}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">
            {stats?.pendingInquiries || 0} Awaiting Confirmation
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">Audience Impressions</span>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats ? Number(stats.totalViews).toLocaleString() : '11,630'}
          </div>
          <span className="text-[11px] text-slate-400">High-Net-Worth Buyers</span>
        </div>
      </div>

      {/* TAB 1: LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-xl text-slate-900">Portfolio Listings ({properties.length})</h3>
            <button
              onClick={() => setActiveTab('add')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Listing</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200/60">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Specs</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="w-14 h-12 rounded-xl object-cover shadow-sm flex-shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block line-clamp-1">{prop.title}</span>
                          <span className="text-xs text-slate-400">{prop.property_type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600 whitespace-nowrap">
                      {prop.price_formatted}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">
                      {prop.location}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {prop.bedrooms}b • {prop.bathrooms}ba • {Number(prop.sqft).toLocaleString()}sf
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800">
                        {prop.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectProperty(prop.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          title="Remove Listing"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES & LEADS */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-xl text-slate-900">Buyer Inquiries & Tour Bookings</h3>
            <p className="text-xs text-slate-500">Live requests submitted via website form connected to backend</p>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div key={inq.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{inq.name}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                        {inq.type || 'Private Tour'}
                      </span>
                      <span className="text-xs text-slate-400">• {new Date(inq.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Target Property: <strong className="text-slate-900">{inq.property_title || inq.property_id}</strong>
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                      <span>Email: <strong className="text-slate-700">{inq.email}</strong></span>
                      {inq.phone && <span>Phone: <strong className="text-slate-700">{inq.phone}</strong></span>}
                      {inq.preferred_date && <span>Requested: <strong className="text-slate-700">{inq.preferred_date} ({inq.preferred_time})</strong></span>}
                    </div>
                    {inq.message && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2 italic">
                        "{inq.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={inq.status || 'New'}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
                        inq.status === 'Closed'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : inq.status === 'Contacted'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="New">Status: New</option>
                      <option value="Contacted">Status: Contacted</option>
                      <option value="Scheduled">Status: Scheduled</option>
                      <option value="Closed">Status: Closed</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-400">
                No inquiries submitted yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ADD NEW LISTING FORM */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-2xl text-slate-900">Publish New Luxury Listing</h3>
            <p className="text-xs text-slate-500">Adds record to Supabase / Express backend and publishes to portfolio</p>
          </div>

          <form onSubmit={handleCreateProperty} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Residence Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bel-Air Modern Promontory"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Offering Price (USD) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15500000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Location / Neighborhood *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bel-Air, Los Angeles, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Metropolitan City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Beverly Hills</option>
                  <option>New York</option>
                  <option>Miami</option>
                  <option>Aspen</option>
                  <option>Austin</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Architectural Typology</label>
                <select
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Modern Villa</option>
                  <option>Penthouse</option>
                  <option>Waterfront Estate</option>
                  <option>Suburban Estate</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Listing Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Exclusive</option>
                  <option>New</option>
                  <option>Open House</option>
                  <option>Price Reduction</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:col-span-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Living Sq Ft</label>
                  <input
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Architectural Description</label>
                <textarea
                  rows={3}
                  placeholder="Bespoke architectural details, finishes, and panoramic site context..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">publish</span>
              <span>{loading ? 'Publishing...' : 'Publish Exclusive Residence'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: SUPABASE CLOUD DATABASE CONFIGURATION */}
      {activeTab === 'supabase' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-600 block mb-1">Database & Cloud Sync</span>
              <h3 className="font-bold text-2xl text-slate-900">Supabase Integration</h3>
              <p className="text-xs text-slate-500">Connect your Supabase PostgreSQL cloud database to power live properties and inquiries</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                supabaseStatus?.configured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {supabaseStatus?.configured ? '● Live Supabase Active' : '● Local Store Active (Dual Mode)'}
              </span>
            </div>
          </div>

          {/* Quick Setup Instructions */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 space-y-3 text-xs sm:text-sm text-slate-600">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">info</span>
              How to Link Your Supabase Project (3 Easy Steps):
            </h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Log in to <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold underline">supabase.com</a> and open your project.</li>
              <li>Go to <strong>Project Settings → API</strong> and copy your <strong>Project URL</strong> and <strong>anon public key</strong>.</li>
              <li>(Optional) In Supabase <strong>SQL Editor</strong>, run the script in <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">supabase/schema.sql</code> to create tables with RLS policies.</li>
            </ol>
          </div>

          {/* Supabase Credentials Form */}
          <form onSubmit={handleSaveSupabase} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Supabase Project URL *</label>
              <input
                type="url"
                required
                placeholder="https://your-project-id.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Found under Supabase Dashboard → Settings → API → Project URL</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Supabase Anon Public API Key *</label>
              <input
                type="password"
                required
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Found under Supabase Dashboard → Settings → API → Project API Keys (anon public)</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingSupabase}
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">sync</span>
                <span>{savingSupabase ? 'Connecting...' : 'Save & Link Supabase'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
