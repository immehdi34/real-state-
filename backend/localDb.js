import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propsFile = path.join(__dirname, 'data', 'seedProperties.json');
const inqsFile = path.join(__dirname, 'data', 'seedInquiries.json');
const agentsFile = path.join(__dirname, 'data', 'seedAgents.json');

let properties = JSON.parse(fs.readFileSync(propsFile, 'utf-8'));
let inquiries = JSON.parse(fs.readFileSync(inqsFile, 'utf-8'));
let agents = JSON.parse(fs.readFileSync(agentsFile, 'utf-8'));

export const localDb = {
  // Properties
  getProperties: (filter = {}) => {
    let result = [...properties];
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    if (filter.city && filter.city !== 'All' && filter.city !== 'All Cities') {
      result = result.filter(p => p.city.toLowerCase() === filter.city.toLowerCase());
    }
    if (filter.property_type && filter.property_type !== 'All' && filter.property_type !== 'All Types') {
      result = result.filter(p => p.property_type.toLowerCase() === filter.property_type.toLowerCase());
    }
    if (filter.minPrice) {
      result = result.filter(p => p.price >= Number(filter.minPrice));
    }
    if (filter.maxPrice) {
      result = result.filter(p => p.price <= Number(filter.maxPrice));
    }
    if (filter.beds && filter.beds !== 'Any' && filter.beds !== 'Any Beds') {
      const minBeds = parseInt(filter.beds);
      if (!isNaN(minBeds)) {
        result = result.filter(p => p.bedrooms >= minBeds);
      }
    }
    if (filter.sort) {
      if (filter.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
      else if (filter.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
      else if (filter.sort === 'sqft') result.sort((a, b) => b.sqft - a.sqft);
      else if (filter.sort === 'popular') result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    return result;
  },

  getPropertyById: (id) => {
    return properties.find(p => p.id === id || String(p.id) === String(id)) || null;
  },

  createProperty: (data) => {
    const newProp = {
      id: `prop-${Date.now()}`,
      created_at: new Date().toISOString(),
      views: 0,
      price_formatted: `$${Number(data.price || 0).toLocaleString()}`,
      ...data
    };
    properties.unshift(newProp);
    return newProp;
  },

  updateProperty: (id, updates) => {
    const idx = properties.findIndex(p => p.id === id || String(p.id) === String(id));
    if (idx === -1) return null;
    properties[idx] = { ...properties[idx], ...updates };
    if (updates.price) {
      properties[idx].price_formatted = `$${Number(updates.price).toLocaleString()}`;
    }
    return properties[idx];
  },

  deleteProperty: (id) => {
    const idx = properties.findIndex(p => p.id === id || String(p.id) === String(id));
    if (idx === -1) return false;
    properties.splice(idx, 1);
    return true;
  },

  // Inquiries
  getInquiries: () => {
    return [...inquiries];
  },

  createInquiry: (data) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      status: 'New',
      created_at: new Date().toISOString(),
      ...data
    };
    inquiries.unshift(newInq);
    return newInq;
  },

  updateInquiryStatus: (id, status) => {
    const inq = inquiries.find(i => i.id === id || String(i.id) === String(id));
    if (!inq) return null;
    inq.status = status;
    return inq;
  },

  // Agents
  getAgents: () => [...agents],

  // Stats
  getStats: () => {
    const totalVolume = properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
    const pendingInquiries = inquiries.filter(i => i.status === 'New').length;
    return {
      activeListings: properties.length,
      totalVolume,
      totalVolumeFormatted: `$${(totalVolume / 1000000).toFixed(1)}M`,
      totalViews,
      totalInquiries: inquiries.length,
      pendingInquiries
    };
  }
};
