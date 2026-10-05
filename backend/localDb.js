import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedProperties } from './data/seedProperties.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let properties = [...seedProperties];

let inquiries = [];
let agents = [];
let messages = [
  {
    id: 'msg-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (310) 555-0199',
    message: 'Inquiring regarding private viewing availability for Horizon Glass Villa this coming weekend.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'New'
  },
  {
    id: 'msg-2',
    name: 'Julian Sterling',
    email: 'j.sterling@sterlingcap.com',
    phone: '+61 412 889 001',
    message: 'Seeking detailed survey blueprints and water license paperwork for Yarra Valley Vineyard Acreage.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    status: 'Read'
  }
];

try {
  const inqsFile = path.join(__dirname, 'data', 'seedInquiries.json');
  if (fs.existsSync(inqsFile)) {
    inquiries = JSON.parse(fs.readFileSync(inqsFile, 'utf-8'));
  }
} catch {
  inquiries = [];
}

try {
  const agentsFile = path.join(__dirname, 'data', 'seedAgents.json');
  if (fs.existsSync(agentsFile)) {
    agents = JSON.parse(fs.readFileSync(agentsFile, 'utf-8'));
  }
} catch {
  agents = [
    {
      id: 'agent-1',
      name: 'Victoria Sterling',
      title: 'Senior Partner & Managing Broker',
      phone: '(+706) 898-0751',
      email: 'victoria@archera.com',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Over 14 years specializing in prime residential estates and trophy architectural listings across global gateway markets.'
    },
    {
      id: 'agent-2',
      name: 'Alexander Chen',
      title: 'Director of Coastal Acquisitions',
      phone: '(+706) 898-0752',
      email: 'alexander@archera.com',
      image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Recognized authority in beachfront and vineyard holdings, orchestrating off-market acquisitions for international clients.'
    },
    {
      id: 'agent-3',
      name: 'Marcus Montgomery',
      title: 'Principal Architecture Advisor',
      phone: '(+706) 898-0753',
      email: 'marcus@archera.com',
      image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Combining architectural appraisal expertise with high-value property development and historic preservation.'
    }
  ];
}

export const localDb = {
  // Properties
  getProperties: (filter = {}) => {
    let result = [...properties];
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }
    if (filter.city && filter.city !== 'All' && filter.city !== 'All Cities') {
      result = result.filter(p => p.city?.toLowerCase() === filter.city.toLowerCase());
    }
    if (filter.property_type && filter.property_type !== 'All' && filter.property_type !== 'All Types') {
      result = result.filter(p => p.property_type?.toLowerCase() === filter.property_type.toLowerCase());
    }
    if (filter.sold !== undefined && filter.sold !== '') {
      const isSold = filter.sold === 'true' || filter.sold === true;
      result = result.filter(p => !!p.sold === isSold);
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
      sold: !!data.sold,
      sold_date: data.sold ? (data.sold_date || 'RECENTLY SOLD') : null,
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
    if (updates.sold !== undefined) {
      properties[idx].sold = !!updates.sold;
      if (updates.sold && !properties[idx].sold_date) {
        properties[idx].sold_date = updates.sold_date || 'RECENTLY SOLD';
      }
    }
    return properties[idx];
  },

  deleteProperty: (id) => {
    const idx = properties.findIndex(p => p.id === id || String(p.id) === String(id));
    if (idx === -1) return false;
    properties.splice(idx, 1);
    return true;
  },

  // Inquiries (Tour requests)
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

  // Contact Messages
  getMessages: () => {
    return [...messages];
  },

  createMessage: (data) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'New',
      ...data
    };
    messages.unshift(newMsg);
    return newMsg;
  },

  // Agents
  getAgents: () => [...agents],

  // Stats
  getStats: () => {
    const totalVolume = properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    const totalViews = properties.reduce((acc, p) => acc + (p.views || 0), 0);
    const pendingInquiries = inquiries.filter(i => i.status === 'New').length;
    const soldCount = properties.filter(p => p.sold).length;
    return {
      activeListings: properties.filter(p => !p.sold).length,
      soldListings: soldCount,
      totalProperties: properties.length,
      totalVolume,
      totalVolumeFormatted: `$${(totalVolume / 1000000).toFixed(1)}M`,
      totalViews,
      totalInquiries: inquiries.length,
      pendingInquiries,
      totalMessages: messages.length
    };
  }
};
