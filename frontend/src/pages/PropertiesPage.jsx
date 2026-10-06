import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Map, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyMap from '../components/PropertyMap';
import { api } from '../services/api';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || 'All';

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState(typeParam);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'available', 'sold'
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  useEffect(() => {
    setSelectedType(typeParam);
  }, [typeParam]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api.getProperties();
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error('Failed to load properties:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === 'All') {
      searchParams.delete('type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type });
    }
  };

  // Filter properties locally
  const filtered = properties.filter((p) => {
    if (selectedType !== 'All' && p.property_type?.toLowerCase() !== selectedType.toLowerCase()) {
      return false;
    }
    if (statusFilter === 'available' && p.sold) return false;
    if (statusFilter === 'sold' && !p.sold) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchCity = p.city?.toLowerCase().includes(q);
      const matchLoc = p.location?.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchLoc && !matchDesc) return false;
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const categories = ['All', 'Apartment', 'Land', 'House', 'Mansion'];

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header Banner */}
      <section style={{
        background: 'var(--color-bg-dark)',
        padding: '70px 0 40px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="archera-container with-left-rail">
          <span className="section-subtitle">ARCHERA COLLECTION</span>
          <h1 className="section-title">
            Curated Real Estate & Estates
          </h1>
          <div className="gold-divider" />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '640px', lineHeight: 1.7 }}>
            Explore verified private residences, oceanfront development parcels, vineyard lands, and trophy mansions.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{
        background: 'var(--color-bg-section)',
        padding: '24px 0',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 100
      }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleTypeChange(cat)}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    borderRadius: '2px',
                    background: selectedType.toLowerCase() === cat.toLowerCase()
                      ? 'var(--color-accent)'
                      : 'rgba(44, 30, 22, 0.06)',
                    color: selectedType.toLowerCase() === cat.toLowerCase()
                      ? '#FFFFFF'
                      : 'var(--color-text)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Controls: Search, Status, Sort, View mode */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              {/* Search Box */}
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search city, estate..."
                  className="form-input"
                  style={{ paddingLeft: '34px', paddingRight: '12px', height: '38px', fontSize: '13px' }}
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ height: '38px', padding: '6px 12px', width: '140px', fontSize: '12px' }}
              >
                <option value="all">All Status</option>
                <option value="available">Available Only</option>
                <option value="sold">Sold (Red Marker)</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ height: '38px', padding: '6px 12px', width: '150px', fontSize: '12px' }}
              >
                <option value="default">Default Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {/* Grid / Map Toggle */}
              <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'grid' ? 'var(--color-accent)' : 'var(--color-bg-card)',
                    color: viewMode === 'grid' ? '#FFFFFF' : 'var(--color-text)'
                  }}
                  title="Grid View"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  style={{
                    padding: '8px 12px',
                    background: viewMode === 'map' ? 'var(--color-accent)' : 'var(--color-bg-card)',
                    color: viewMode === 'map' ? '#FFFFFF' : 'var(--color-text)'
                  }}
                  title="Map View (Red pins = Sold)"
                >
                  <Map size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '60px 0 100px 0', background: 'var(--color-bg-dark)' }}>
        <div className="archera-container with-left-rail">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Showing <strong style={{ color: 'var(--color-text)' }}>{sorted.length}</strong> properties
              {selectedType !== 'All' && <span> in <strong style={{ color: 'var(--color-accent)' }}>{selectedType}</strong></span>}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-muted)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-accent)', marginBottom: '8px' }}>
                Loading Archera Portfolio...
              </div>
            </div>
          ) : viewMode === 'map' ? (
            <div>
              <PropertyMap
                properties={sorted}
                height="650px"
                zoom={3}
                center={[-20.0, 15.0]}
              />
            </div>
          ) : sorted.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '2px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-text)', marginBottom: '8px' }}>
                No Properties Found
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                No properties match your active filter criteria. Try resetting your search or category.
              </p>
              <button
                onClick={() => { setSelectedType('All'); setStatusFilter('all'); setSearch(''); }}
                className="btn-gold"
                style={{ fontSize: '11px' }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '32px'
            }}>
              {sorted.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
