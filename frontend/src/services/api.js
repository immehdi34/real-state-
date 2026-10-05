const API_BASE = '/api';

export const api = {
  // Properties
  async getProperties(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/properties?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch properties');
    return res.json();
  },

  async getProperty(id) {
    const res = await fetch(`${API_BASE}/properties/${id}`);
    if (!res.ok) throw new Error('Failed to fetch property details');
    return res.json();
  },

  async createProperty(propertyData) {
    const res = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData),
    });
    if (!res.ok) throw new Error('Failed to create property listing');
    return res.json();
  },

  async updateProperty(id, propertyData) {
    const res = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData),
    });
    if (!res.ok) throw new Error('Failed to update property');
    return res.json();
  },

  async deleteProperty(id) {
    const res = await fetch(`${API_BASE}/properties/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete property');
    return res.json();
  },

  // Inquiries & Tour Bookings
  async getInquiries() {
    const res = await fetch(`${API_BASE}/inquiries`);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    return res.json();
  },

  async submitInquiry(inquiryData) {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    if (!res.ok) throw new Error('Failed to submit tour request');
    return res.json();
  },

  async updateInquiryStatus(id, status) {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return res.json();
  },

  // Agents
  async getAgents() {
    const res = await fetch(`${API_BASE}/agents`);
    if (!res.ok) throw new Error('Failed to fetch advisors');
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch dashboard statistics');
    return res.json();
  },

  // Supabase Config
  async updateSupabaseConfig(supabase_url, supabase_key) {
    const res = await fetch(`${API_BASE}/config/supabase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ supabase_url, supabase_key }),
    });
    if (!res.ok) throw new Error('Failed to update Supabase configuration');
    return res.json();
  }
};
