CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX IF NOT EXISTS idx_properties_bathrooms ON properties(bathrooms);
CREATE INDEX IF NOT EXISTS idx_properties_landlord ON properties("landlordId");

CREATE INDEX IF NOT EXISTS idx_applications_tenant ON applications("tenantId");
CREATE INDEX IF NOT EXISTS idx_applications_property ON applications("propertyId");
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

CREATE INDEX IF NOT EXISTS idx_saved_properties_user ON saved_properties("userId");
CREATE INDEX IF NOT EXISTS idx_saved_properties_property ON saved_properties("propertyId");

-- Sample landlords (using bcrypt hash for password: "password123")
INSERT INTO users (id, email, "fullName", phone, password, role, status, "emailVerified", "createdAt", "updatedAt") VALUES
  (
    uuid_generate_v4(),
    'landlord1@renteasy9ja.com',
    'Adebayo Oluwaseun',
    '+2348012345678',
    '$2b$12$LQv3c1yqBwlVHpPjrj8gn.VJmZqz5gH8YE1/2FZqG4NZhh4V4HhS6',
    'landlord',
    'verified',
    true,
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'landlord2@renteasy9ja.com',
    'Chioma Nwosu',
    '+2348123456789',
    '$2b$12$LQv3c1yqBwlVHpPjrj8gn.VJmZqz5gH8YE1/2FZqG4NZhh4V4HhS6',
    'landlord',
    'verified',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (email) DO NOTHING;

-- Sample tenants (using bcrypt hash for password: "password123")
INSERT INTO users (id, email, "fullName", phone, password, role, status, "emailVerified", "createdAt", "updatedAt") VALUES
  (
    uuid_generate_v4(),
    'tenant1@renteasy9ja.com',
    'John Doe',
    '+2348234567890',
    '$2b$12$LQv3c1yqBwlVHpPjrj8gn.VJmZqz5gH8YE1/2FZqG4NZhh4V4HhS6',
    'tenant',
    'verified',
    true,
    NOW(),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'tenant2@renteasy9ja.com',
    'Sarah Johnson',
    '+2348345678901',
    '$2b$12$LQv3c1yqBwlVHpPjrj8gn.VJmZqz5gH8YE1/2FZqG4NZhh4V4HhS6',
    'tenant',
    'verified',
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT (email) DO NOTHING;
