/*
  # Create tables and RLS policies

  1. Tables
    - projects
    - experience
    - media
    - products

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to perform CRUD operations
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  ended_at TIMESTAMPTZ,
  lead TEXT,
  tags TEXT[],
  content JSONB NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  company TEXT NOT NULL,
  jobtitle TEXT NOT NULL,
  type TEXT NOT NULL,
  tags TEXT[],
  content JSONB NOT NULL
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read experience"
  ON experience
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert experience"
  ON experience
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update experience"
  ON experience
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete experience"
  ON experience
  FOR DELETE
  TO authenticated
  USING (true);

-- Media table
CREATE TABLE IF NOT EXISTS media (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  madeby TEXT NOT NULL,
  release INTEGER NOT NULL,
  comment TEXT,
  reconsumed INTEGER DEFAULT 0,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read media"
  ON media
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert media"
  ON media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update media"
  ON media
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete media"
  ON media
  FOR DELETE
  TO authenticated
  USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  img_url TEXT,
  type TEXT NOT NULL
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);