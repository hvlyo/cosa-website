-- CoSA Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Create events table with proper structure
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    registration_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public read access" ON events
    FOR SELECT USING (true);

-- Create policy to allow public insert access (for admin dashboard)
CREATE POLICY "Public insert access" ON events
    FOR INSERT WITH CHECK (true);

-- Create policy to allow public update access (for admin dashboard)
CREATE POLICY "Public update access" ON events
    FOR UPDATE USING (true);

-- Create policy to allow public delete access (for admin dashboard)
CREATE POLICY "Public delete access" ON events
    FOR DELETE USING (true);

-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for event images
CREATE POLICY "Public read access for event images" ON storage.objects
    FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Public insert access for event images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'event-images');

-- Create inquiries table for contact form
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for inquiries
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert access for inquiries
CREATE POLICY "Public insert access for inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Create officers table (optional)
CREATE TABLE IF NOT EXISTS officers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for officers
ALTER TABLE officers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access for officers
CREATE POLICY "Public read access for officers" ON officers
    FOR SELECT USING (true);

-- Insert some sample events for testing
INSERT INTO events (name, tag, description, date, time, location, image_url, registration_link) VALUES
(
    'Creative Workshop: Brand Identity Design',
    'Workshop',
    'Learn the fundamentals of brand identity design with industry professionals. This hands-on workshop will cover logo design, color theory, typography, and brand guidelines.',
    '2024-02-15',
    '14:00',
    'Design Studio A, Main Campus',
    NULL,
    'https://forms.example.com/workshop-registration'
),
(
    'Networking Mixer with Ad Agencies',
    'Networking',
    'Connect with professionals from top advertising agencies in the region. Build your network and learn about career opportunities in the advertising industry.',
    '2024-02-22',
    '18:00',
    'Campus Center, Conference Room',
    NULL,
    'https://forms.example.com/networking-event'
),
(
    'Campaign Pitch Competition',
    'Competition',
    'Present your creative campaign ideas to a panel of industry judges. Showcase your strategic thinking and creative skills in this exciting competition.',
    '2024-03-01',
    '10:00',
    'University Auditorium',
    NULL,
    'https://forms.example.com/pitch-competition'
);

-- Insert sample officers
INSERT INTO officers (name, position, photo_url) VALUES
('Sarah Johnson', 'President', NULL),
('Michael Chen', 'Vice President', NULL),
('Emily Rodriguez', 'Secretary', NULL),
('David Kim', 'Treasurer', NULL);

-- Display the created tables
SELECT 'Events table created successfully' as status;
SELECT 'Storage bucket created successfully' as status;
SELECT 'Inquiries table created successfully' as status;
SELECT 'Officers table created successfully' as status; 