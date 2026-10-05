import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, CheckCircle, Database, MessageSquare, Calendar, RefreshCw, Eye, Check } from 'lucide-react';
import { api } from '../services/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('properties'); // 'properties', 'inquiries', 'messages', 'supabase'
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  // Form for adding new property
  const [newProp, setNewProp] = useState({
    title: '',
    property_type: 'Mansion',
    price: '',
    city: 'Melbourne',
    location: '',
    latitude: -37.8136,
    longitude: 144.9631,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 5000,
    description: '',
    image_url: '/images/hero_bg.jpg',
    sold: false,
    sold_date: ''
  });

  // Form for Supabase
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [sbStatus, setSbStatus] = useState(null);
  const [sbLoading, setSbLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [propsRes, inqsRes, msgsRes, statsRes] = await Promise.allSettled([
        api.getProperties(),
        api.getInquiries(),
        api.getMessages(),
        api.getStats()
      ]);

      if (propsRes.status === 'fulfilled' && propsRes.value?.properties) {
        setProperties(propsRes.value.properties);
      }
      if (inqsRes.status === 'fulfilled' && inqsRes.value?.inquiries) {
        setInquiries(inqsRes.value.inquiries);
      }
      if (msgsRes.status === 'fulfilled' && msgsRes.value?.messages) {
        setMessages(msgsRes.value.messages);
      }
      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value?.stats);
        setSbStatus(statsRes.value?.database);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleSold = async (prop) => {
    try {
      const willBeSold = !prop.sold;
      const todayMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
      const updates = {
        sold: willBeSold,
        sold_date: willBeSold ? (prop.sold_date || todayMonth) : null
      };

      await api.updateProperty(prop.id, updates);
      setNotice(`Updated "${prop.title}" status to ${willBeSold ? 'SOLD (Red Marker)' : 'AVAILABLE (Gold Marker)'}`);
      setTimeout(() => setNotice(''), 4000);
      loadData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await api.deleteProperty(id);
      setNotice(`Deleted "${title}" successfully.`);
      setTimeout(() => setNotice(''), 4000);
      loadData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    if (!newProp.title || !newProp.price || !newProp.location) {
      alert('Title, price, and location are required.');
      return;
    }

    try {
      await api.createProperty({
        ...newProp,
        price: Number(newProp.price),
        latitude: Number(newProp.latitude),
        longitude: Number(newProp.longitude),
        bedrooms: Number(newProp.bedrooms),
        bathrooms: Number(newProp.bathrooms),
        sqft: Number(newProp.sqft),
        price_formatted: `$${Number(newProp.price).toLocaleString()}`
      });

      setNotice(`Property "${newProp.title}" created successfully!`);
      setTimeout(() => setNotice(''), 4000);
      setNewProp({
        title: '',
        property_type: 'Mansion',
        price: '',
        city: 'Melbourne',
        location: '',
        latitude: -37.8136,
        longitude: 144.9631,
        bedrooms: 4,
        bathrooms: 4,
        sqft: 5000,
        description: '',
        image_url: '/images/hero_bg.jpg',
        sold: false,
        sold_date: ''
      });
      loadData();
    } catch (err) {
      alert('Failed to create property: ' + err.message);
    }
  };

  const handleUpdateSupabase = async (e) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey) {
      alert('Please enter both Supabase URL and Key.');
      return;
    }

    try {
      setSbLoading(true);
      const res = await api.updateSupabaseConfig(supabaseUrl, supabaseKey);
      if (res.success) {
        setNotice('Supabase credentials successfully linked and activated!');
        setSbStatus(res.status);
      } else {
        alert('Invalid Supabase credentials format.');
      }
    } catch (err) {
      alert('Supabase config error: ' + err.message);
    } finally {
      setSbLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)', background: 'var(--color-bg-dark)', minHeight: '100vh' }}>
      {/* Top Banner */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '60px 0 30px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="section-subtitle">INTERNAL PORTAL</span>
              <h1 className="section-title">
                Archera Management Console
              </h1>
              <div className="gold-divider" />
            </div>

            <button onClick={loadData} className="btn-outline-gold" style={{ fontSize: '11px' }}>
              <RefreshCw size={14} />
              <span>REFRESH DATA</span>
            </button>
          </div>

          {notice && (
            <div style={{
              background: 'rgba(232, 168, 73, 0.15)',
              border: '1px solid var(--color-accent)',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '2px',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle size={18} style={{ color: 'var(--color-accent)' }} />
              <span>{notice}</span>
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section style={{ background: 'var(--color-bg-section)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 0' }}>
            <button
              onClick={() => setActiveTab('properties')}
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: activeTab === 'properties' ? 'var(--color-accent)' : 'transparent',
                color: activeTab === 'properties' ? '#141414' : 'var(--color-text-secondary)',
                borderRadius: '2px'
              }}
            >
              Properties ({properties.length})
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: activeTab === 'inquiries' ? 'var(--color-accent)' : 'transparent',
                color: activeTab === 'inquiries' ? '#141414' : 'var(--color-text-secondary)',
                borderRadius: '2px'
              }}
            >
              Tour Inquiries ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: activeTab === 'messages' ? 'var(--color-accent)' : 'transparent',
                color: activeTab === 'messages' ? '#141414' : 'var(--color-text-secondary)',
                borderRadius: '2px'
              }}
            >
              Messages ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab('supabase')}
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                background: activeTab === 'supabase' ? 'var(--color-accent)' : 'transparent',
                color: activeTab === 'supabase' ? '#141414' : 'var(--color-text-secondary)',
                borderRadius: '2px'
              }}
            >
              Supabase Gateway
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <section style={{ padding: '40px 0 100px 0' }}>
        <div className="archera-container with-left-rail">
          {/* TAB 1: PROPERTIES */}
          {activeTab === 'properties' && (
            <div>
              {/* Add New Property Form */}
              <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '32px', borderRadius: '2px', marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#ffffff', marginBottom: '8px' }}>
                  Add New Listing or Sold Asset
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '24px' }}>
                  Fill in property details. You can mark it as Available or Sold immediately.
                </p>

                <form onSubmit={handleCreateProperty}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Property Title *</label>
                      <input
                        type="text"
                        required
                        value={newProp.title}
                        onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                        className="form-input"
                        placeholder="e.g. Toorak Modern Heritage Villa"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Property Type *</label>
                      <select
                        value={newProp.property_type}
                        onChange={(e) => setNewProp({ ...newProp, property_type: e.target.value })}
                        className="form-select"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Land">Land</option>
                        <option value="House">House</option>
                        <option value="Mansion">Mansion</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Offering / Sold Price ($) *</label>
                      <input
                        type="number"
                        required
                        value={newProp.price}
                        onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                        className="form-input"
                        placeholder="e.g. 14500000"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        required
                        value={newProp.city}
                        onChange={(e) => setNewProp({ ...newProp, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Address / Location *</label>
                      <input
                        type="text"
                        required
                        value={newProp.location}
                        onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                        className="form-input"
                        placeholder="e.g. 69 Queen St, Melbourne, VIC"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Latitude & Longitude</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <input
                          type="number"
                          step="any"
                          value={newProp.latitude}
                          onChange={(e) => setNewProp({ ...newProp, latitude: e.target.value })}
                          className="form-input"
                          placeholder="Lat (-37.81)"
                        />
                        <input
                          type="number"
                          step="any"
                          value={newProp.longitude}
                          onChange={(e) => setNewProp({ ...newProp, longitude: e.target.value })}
                          className="form-input"
                          placeholder="Lng (144.96)"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Bedrooms / Bathrooms / Sq Ft</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <input
                          type="number"
                          value={newProp.bedrooms}
                          onChange={(e) => setNewProp({ ...newProp, bedrooms: e.target.value })}
                          className="form-input"
                          placeholder="Beds"
                        />
                        <input
                          type="number"
                          value={newProp.bathrooms}
                          onChange={(e) => setNewProp({ ...newProp, bathrooms: e.target.value })}
                          className="form-input"
                          placeholder="Baths"
                        />
                        <input
                          type="number"
                          value={newProp.sqft}
                          onChange={(e) => setNewProp({ ...newProp, sqft: e.target.value })}
                          className="form-input"
                          placeholder="Sqft"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Image URL / Path</label>
                      <select
                        value={newProp.image_url}
                        onChange={(e) => setNewProp({ ...newProp, image_url: e.target.value })}
                        className="form-select"
                      >
                        <option value="/images/hero_bg.jpg">/images/hero_bg.jpg (Mansion Interior)</option>
                        <option value="/images/apartment_1.jpg">/images/apartment_1.jpg (Sky Penthouse)</option>
                        <option value="/images/apartment_2.jpg">/images/apartment_2.jpg (Harbour Penthouse)</option>
                        <option value="/images/house_1.jpg">/images/house_1.jpg (Modern House)</option>
                        <option value="/images/house_2.jpg">/images/house_2.jpg (Alpine Sanctuary)</option>
                        <option value="/images/land_1.jpg">/images/land_1.jpg (Vineyard Acreage)</option>
                        <option value="/images/land_2.jpg">/images/land_2.jpg (Pacific Bluff Land)</option>
                        <option value="/images/land_3.jpg">/images/land_3.jpg (Napa Vineyard Land)</option>
                        <option value="/images/mansion_2.jpg">/images/mansion_2.jpg (Waterfront Mansion)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      rows={3}
                      value={newProp.description}
                      onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                      className="form-textarea"
                      placeholder="Detailed architectural narrative..."
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#ffffff' }}>
                      <input
                        type="checkbox"
                        checked={newProp.sold}
                        onChange={(e) => setNewProp({ ...newProp, sold: e.target.checked })}
                      />
                      <span>Mark this property as Sold (Will display with a RED pin on the map)</span>
                    </label>

                    {newProp.sold && (
                      <input
                        type="text"
                        value={newProp.sold_date}
                        onChange={(e) => setNewProp({ ...newProp, sold_date: e.target.value })}
                        placeholder="Sold Date (e.g. MARCH 2026)"
                        className="form-input"
                        style={{ width: '220px', height: '36px' }}
                      />
                    )}
                  </div>

                  <button type="submit" className="btn-gold">
                    <Plus size={16} />
                    <span>CREATE PROPERTY LISTING</span>
                  </button>
                </form>
              </div>

              {/* Properties Table */}
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffffff', marginBottom: '16px' }}>
                All Properties & Status Management
              </h3>

              <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '2px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#141414', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <th style={{ padding: '14px 16px' }}>Property</th>
                      <th style={{ padding: '14px 16px' }}>Type</th>
                      <th style={{ padding: '14px 16px' }}>Price</th>
                      <th style={{ padding: '14px 16px' }}>Location</th>
                      <th style={{ padding: '14px 16px' }}>Status</th>
                      <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600, color: '#ffffff' }}>
                          {p.title}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span className="badge-type">{p.property_type}</span>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-accent)', fontWeight: 600 }}>
                          {p.price_formatted}
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)' }}>
                          {p.city}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          {p.sold ? (
                            <span className="badge-sold">
                              SOLD ({p.sold_date || 'COMPLETED'})
                            </span>
                          ) : (
                            <span className="badge-available">
                              AVAILABLE
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => handleToggleSold(p)}
                              style={{
                                padding: '6px 12px',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                background: p.sold ? 'rgba(232, 168, 73, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: p.sold ? 'var(--color-accent)' : '#f87171',
                                border: '1px solid var(--color-border)',
                                borderRadius: '2px'
                              }}
                              title={p.sold ? 'Mark as Available' : 'Mark as Sold'}
                            >
                              {p.sold ? 'Set Available' : 'Mark Sold'}
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(p.id, p.title)}
                              style={{
                                padding: '6px 10px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--color-text-muted)',
                                borderRadius: '2px'
                              }}
                              title="Delete Property"
                            >
                              <Trash2 size={14} />
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

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffffff', marginBottom: '16px' }}>
                Private Showing Requests
              </h3>
              {inquiries.length === 0 ? (
                <div style={{ padding: '40px', background: 'var(--color-bg-card)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No viewing inquiries received yet.
                </div>
              ) : (
                <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '2px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#141414', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left' }}>
                        <th style={{ padding: '14px 16px' }}>Client</th>
                        <th style={{ padding: '14px 16px' }}>Email & Phone</th>
                        <th style={{ padding: '14px 16px' }}>Property / Inquiry</th>
                        <th style={{ padding: '14px 16px' }}>Preferred Time</th>
                        <th style={{ padding: '14px 16px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inq) => (
                        <tr key={inq.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 600, color: '#ffffff' }}>{inq.name}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)' }}>
                            {inq.email}<br />{inq.phone || '—'}
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--color-accent)' }}>
                            {inq.property_title || inq.property_id || 'General'}
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)' }}>
                            {inq.preferred_date || ''} ({inq.preferred_time || 'Any'})
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="badge-available">{inq.status || 'New'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffffff', marginBottom: '16px' }}>
                Contact Messages Received
              </h3>
              {messages.length === 0 ? (
                <div style={{ padding: '40px', background: 'var(--color-bg-card)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No messages submitted yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '24px', borderRadius: '2px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <strong style={{ fontSize: '16px', color: '#ffffff' }}>{msg.name}</strong>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                            {msg.email} {msg.phone && `· ${msg.phone}`}
                          </div>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1.6, background: '#141414', padding: '16px', borderRadius: '2px', border: '1px solid var(--color-border)' }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SUPABASE GATEWAY */}
          {activeTab === 'supabase' && (
            <div style={{ maxWidth: '640px' }}>
              <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', padding: '36px', borderRadius: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Database size={24} style={{ color: 'var(--color-accent)' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#ffffff' }}>
                    Supabase Cloud Database
                  </h3>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#141414',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Active Storage Engine
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: sbStatus?.configured ? '#22c55e' : 'var(--color-accent)', marginTop: '4px' }}>
                    {sbStatus?.configured ? '● Connected to Live Supabase Cloud' : '● Local Dual-Mode Seed Store'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    {sbStatus?.configured
                      ? `Project URL: ${sbStatus.url}`
                      : 'Running in dual-mode. Enter your Supabase project credentials below to link cloud persistence.'}
                  </div>
                </div>

                <form onSubmit={handleUpdateSupabase}>
                  <div className="form-group">
                    <label className="form-label">Supabase Project URL</label>
                    <input
                      type="url"
                      required
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://xyzcompany.supabase.co"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Supabase Anon Public API Key</label>
                    <input
                      type="password"
                      required
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sbLoading}
                    className="btn-gold"
                    style={{ width: '100%', marginTop: '12px' }}
                  >
                    {sbLoading ? 'VALIDATING...' : 'LINK & PERSIST SUPABASE'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
