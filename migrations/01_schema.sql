DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS properties
CASCADE;
DROP TABLE IF EXISTS reservations
CASCADE;
DROP TABLE IF EXISTS property_reviews
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE properties
(
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL references users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  cost_per_night INTEGER,
  parking_spaces INTEGER,
  number_of_bathrooms INTEGER,
  number_of_bedrooms INTEGER,
  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  post_code VARCHAR(255),
  active BOOLEAN
);


CREATE TABLE reservations
(
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  property_id INTEGER NOT NULL references properties(id) ON DELETE CASCADE,
  guest_id INTEGER NOT NULL references users(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews
(
  id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL references users(id) ON DELETE CASCADE,
  property_id INTEGER NOT NULL references properties(id) ON DELETE CASCADE,
  reservation_id INTEGER NOT NULL references reservations(id) ON DELETE CASCADE
);

