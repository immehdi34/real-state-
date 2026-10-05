import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getSupabase, 
  getIsSupabaseConfigured, 
  getSupabaseStatus, 
  updateSupabaseConfig 
} from './supabaseClient.js';
import { localDb } from './localDb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Render HTML Dashboard for browser visits
function renderHealthDashboard(req, res) {
  const status = getSupabaseStatus();
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AuraEstates — API & Database Gateway</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, sans-serif; }
    body { background: #f8fafc; color: #0f172a; padding: 40px 20px; line-height: 1.5; }
    .container { max-width: 720px; margin: 0 auto; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
    .title { font-size: 22px; font-weight: 700; color: #0f172a; }
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-online { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
    .badge-supabase { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
    .badge-local { background: #fefce8; color: #ca8a04; border: 1px solid #fef08a; }
    .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #059669; color: #ffffff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; border: none; cursor: pointer; }
    .btn-primary:hover { background: #047857; }
    .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; }
    .btn-secondary:hover { background: #1e293b; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .form-control { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; background: #f8fafc; }
    .form-control:focus { outline: none; border-color: #059669; background: #ffffff; }
    .endpoints { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 16px; }
    .endpoint-link { display: block; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #334155; font-size: 13px; font-weight: 500; }
    .endpoint-link:hover { border-color: #059669; color: #059669; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div>
          <h1 class="title">AuraEstates API Server</h1>
          <p style="font-size: 13px; color: #64748b; margin-top: 4px;">Express.js + Supabase Real Estate Backend</p>
        </div>
        <span class="badge badge-online">● Server Active</span>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 24px;">
        <a href="http://localhost:3000" class="btn-primary" target="_blank">
          Open Website (http://localhost:3000) ↗
        </a>
      </div>

      <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 13px; font-weight: 600; color: #334155;">Database Connection:</span>
          <span class="badge ${status.configured ? 'badge-supabase' : 'badge-local'}">
            ${status.configured ? 'Connected to Supabase' : 'Local Seed Store Mode'}
          </span>
        </div>
        <p style="font-size: 12px; color: #64748b;">
          ${status.configured 
            ? 'Live Supabase project URL: ' + status.url
            : 'Currently serving mock data. Enter your Supabase Project credentials below to link directly.'}
        </p>
      </div>

      <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Link Supabase Credentials</h2>
      <form action="/api/config/supabase" method="POST">
        <div class="form-group">
          <label>Supabase Project URL</label>
          <input type="url" name="supabase_url" class="form-control" placeholder="https://xyzcompany.supabase.co" value="${status.url}" required>
        </div>
        <div class="form-group">
          <label>Supabase Anon / Public API Key</label>
          <input type="password" name="supabase_key" class="form-control" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." required>
        </div>
        <button type="submit" class="btn-secondary" style="width: 100%;">
          Save & Link Supabase
        </button>
      </form>
    </div>

    <div class="card">
      <h3 style="font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 12px;">Active REST Endpoints</h3>
      <div class="endpoints">
        <a href="/api/properties" class="endpoint-link" target="_blank">GET /api/properties ↗</a>
        <a href="/api/inquiries" class="endpoint-link" target="_blank">GET /api/inquiries ↗</a>
        <a href="/api/stats" class="endpoint-link" target="_blank">GET /api/stats ↗</a>
        <a href="/api/health?format=json" class="endpoint-link" target="_blank">GET /api/health (JSON) ↗</a>
      </div>
    </div>
  </div>
</body>
</html>`;
  res.send(html);
}

// 0. Root & Health
app.get('/', (req, res) => {
  if (req.accepts('html') && !req.query.format) {
    return renderHealthDashboard(req, res);
  }
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getSupabaseStatus().mode,
    service: 'AuraEstates Fullstack API'
  });
});

app.get('/api/health', (req, res) => {
  if (req.accepts('html') && req.query.format !== 'json') {
    return renderHealthDashboard(req, res);
  }
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getSupabaseStatus().mode,
    supabase: getSupabaseStatus(),
    service: 'AuraEstates Fullstack API'
  });
});

// Configure Supabase Endpoint
app.post('/api/config/supabase', async (req, res) => {
  const { supabase_url, supabase_key } = req.body;
  if (!supabase_url || !supabase_key) {
    return res.status(400).json({ success: false, error: 'Both URL and Key are required.' });
  }

  const configured = updateSupabaseConfig(supabase_url, supabase_key);

  // If request came from HTML form, redirect back to health dashboard
  if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
    return res.redirect('/api/health');
  }

  res.json({
    success: configured,
    message: configured ? 'Supabase connected successfully!' : 'Invalid Supabase URL or key format.',
    status: getSupabaseStatus()
  });
});

// 1. GET /api/properties
app.get('/api/properties', async (req, res) => {
  try {
    const { search, city, property_type, minPrice, maxPrice, beds, sort, featured } = req.query;

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      let query = sb.from('properties').select('*');
      if (search) query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%,city.ilike.%${search}%`);
      if (city && city !== 'All') query = query.eq('city', city);
      if (property_type && property_type !== 'All') query = query.eq('property_type', property_type);
      if (minPrice) query = query.gte('price', Number(minPrice));
      if (maxPrice) query = query.lte('price', Number(maxPrice));
      if (beds && beds !== 'Any') query = query.gte('bedrooms', parseInt(beds));
      if (featured === 'true') query = query.eq('featured', true);

      if (sort === 'price-asc') query = query.order('price', { ascending: true });
      else if (sort === 'price-desc') query = query.order('price', { ascending: false });
      else query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) {
        console.warn('Supabase query error, falling back to localDb:', error.message);
      } else if (data && data.length > 0) {
        return res.json({ success: true, count: data.length, properties: data });
      }
    }

    // Local DB fallback
    const filtered = localDb.getProperties({ search, city, property_type, minPrice, maxPrice, beds, sort });
    res.json({ success: true, count: filtered.length, properties: filtered });
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET /api/properties/:id
app.get('/api/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('properties').select('*').eq('id', id).single();
      if (!error && data) return res.json({ success: true, property: data });
    }

    const prop = localDb.getPropertyById(id);
    if (!prop) return res.status(404).json({ success: false, error: 'Property not found' });
    res.json({ success: true, property: prop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/properties
app.post('/api/properties', async (req, res) => {
  try {
    const propertyData = req.body;
    if (!propertyData.title || !propertyData.price || !propertyData.location) {
      return res.status(400).json({ success: false, error: 'Title, price, and location are required.' });
    }

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('properties').insert([propertyData]).select().single();
      if (!error && data) return res.status(201).json({ success: true, property: data });
    }

    const created = localDb.createProperty(propertyData);
    res.status(201).json({ success: true, property: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. PUT /api/properties/:id
app.put('/api/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('properties').update(updates).eq('id', id).select().single();
      if (!error && data) return res.json({ success: true, property: data });
    }

    const updated = localDb.updateProperty(id, updates);
    if (!updated) return res.status(404).json({ success: false, error: 'Property not found' });
    res.json({ success: true, property: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. DELETE /api/properties/:id
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { error } = await sb.from('properties').delete().eq('id', id);
      if (!error) return res.json({ success: true, message: 'Property deleted successfully' });
    }

    const ok = localDb.deleteProperty(id);
    if (!ok) return res.status(404).json({ success: false, error: 'Property not found' });
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. INQUIRIES
app.get('/api/inquiries', async (req, res) => {
  try {
    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('inquiries').select('*, properties(title)').order('created_at', { ascending: false });
      if (!error && data) return res.json({ success: true, inquiries: data });
    }
    const inqs = localDb.getInquiries();
    res.json({ success: true, inquiries: inqs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiryData = req.body;
    if (!inquiryData.name || !inquiryData.email) {
      return res.status(400).json({ success: false, error: 'Name and email are required.' });
    }

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('inquiries').insert([inquiryData]).select().single();
      if (!error && data) return res.status(201).json({ success: true, inquiry: data, message: 'Tour request submitted successfully!' });
    }

    const created = localDb.createInquiry(inquiryData);
    res.status(201).json({ success: true, inquiry: created, message: 'Tour request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('inquiries').update({ status }).eq('id', id).select().single();
      if (!error && data) return res.json({ success: true, inquiry: data });
    }

    const updated = localDb.updateInquiryStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, inquiry: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. AGENTS
app.get('/api/agents', async (req, res) => {
  try {
    if (getIsSupabaseConfigured()) {
      const sb = getSupabase();
      const { data, error } = await sb.from('agents').select('*');
      if (!error && data) return res.json({ success: true, agents: data });
    }
    res.json({ success: true, agents: localDb.getAgents() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. STATS
app.get('/api/stats', async (req, res) => {
  try {
    const stats = localDb.getStats();
    res.json({ success: true, stats, database: getSupabaseStatus() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export app for Vercel serverless deployment
export default app;

// Listen if run directly
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 AuraEstates Express Server running on http://localhost:${PORT}`);
  });
}
