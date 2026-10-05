import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

let currentUrl = process.env.SUPABASE_URL || '';
let currentKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY || '';
let supabaseInstance = null;

function checkConfigured(url, key) {
  return Boolean(
    url &&
    key &&
    !url.includes('placeholder') &&
    !url.includes('your-project') &&
    url.startsWith('https://')
  );
}

export function getIsSupabaseConfigured() {
  return checkConfigured(currentUrl, currentKey);
}

export function getSupabase() {
  if (getIsSupabaseConfigured()) {
    if (!supabaseInstance) {
      supabaseInstance = createClient(currentUrl, currentKey);
    }
    return supabaseInstance;
  }
  return null;
}

export function updateSupabaseConfig(url, key) {
  currentUrl = (url || '').trim();
  currentKey = (key || '').trim();
  supabaseInstance = null;

  // Persist to .env
  let envContent = `PORT=5000\nSUPABASE_URL=${currentUrl}\nSUPABASE_ANON_KEY=${currentKey}\n`;
  try {
    fs.writeFileSync(envPath, envContent, 'utf-8');
  } catch (err) {
    console.error('Failed to write .env:', err);
  }

  const configured = getIsSupabaseConfigured();
  if (configured) {
    supabaseInstance = createClient(currentUrl, currentKey);
    console.log('✅ Supabase connected dynamically to:', currentUrl);
  }
  return configured;
}

export function getSupabaseStatus() {
  const configured = getIsSupabaseConfigured();
  return {
    configured,
    url: configured ? currentUrl : '',
    hasKey: Boolean(currentKey),
    mode: configured ? 'supabase' : 'local-store'
  };
}

if (getIsSupabaseConfigured()) {
  console.log('✅ Supabase connected to:', currentUrl);
} else {
  console.log('ℹ️ Running in Dual-Mode with local database (ready to link Supabase anytime).');
}
