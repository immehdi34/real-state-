-- ===================================================
-- AuraEstates Real Estate Portal - Supabase Schema
-- ===================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    price NUMERIC(15, 2) NOT NULL,
    price_formatted VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms NUMERIC(4, 1) NOT NULL DEFAULT 1.0,
    sqft INTEGER NOT NULL,
    garage INTEGER DEFAULT 2,
    property_type VARCHAR(100) NOT NULL, -- 'Modern Villa', 'Penthouse', 'Suburban Estate', 'Waterfront Estate', 'Architectural Loft'
    status VARCHAR(50) DEFAULT 'Exclusive', -- 'Exclusive', 'New', 'Open House', 'Price Reduction'
    featured BOOLEAN DEFAULT false,
    sold BOOLEAN DEFAULT false,
    sold_date VARCHAR(100),
    image TEXT NOT NULL,
    gallery TEXT[] DEFAULT '{}',
    description TEXT,
    amenities TEXT[] DEFAULT '{}',
    lat NUMERIC(10, 6) DEFAULT 34.0736,
    lng NUMERIC(10, 6) DEFAULT -118.4004,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contact Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Inquiries & Tour Bookings Table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    type VARCHAR(50) DEFAULT 'Schedule Tour', -- 'Schedule Tour', 'Private Showing', 'General Inquiry', 'Offer'
    preferred_date DATE,
    preferred_time VARCHAR(50),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Scheduled', 'Closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Advisors / Agents Table
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar TEXT NOT NULL,
    license_number VARCHAR(100),
    sales_volume VARCHAR(50),
    rating NUMERIC(2, 1) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active properties and agents
CREATE POLICY "Public can view properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public can insert properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update properties" ON properties FOR UPDATE USING (true);
CREATE POLICY "Public can delete properties" ON properties FOR DELETE USING (true);

CREATE POLICY "Public can view agents" ON agents FOR SELECT USING (true);

-- Allow public to submit inquiries & view their own
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view inquiries" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Public can update inquiries" ON inquiries FOR UPDATE USING (true);
