INSERT INTO users
  (name, email, password)
VALUES
  ('Arron Patterson', 'arron.patterson@example.com', '$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Claude Butler', 'claude.butler@example.com', '$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Jessie Rogers', 'jessie.rogers@example.com', '$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'house 1', 'a house', 'https:
//source.unsplash.com/random/150x150', 'https:
//source.unsplash.com/random', 100, 1, 1, 2, 'Canada', '2690 Walnut Hill Ln', 'Vancouver', 'BC', 'M8V 4A2', true),

  (2, 'house 2', 'a house', 'https:
//source.unsplash.com/random/150x150', 'https:
//source.unsplash.com/random', 100, 1, 1, 2, 'Canada', '2690 Walnut Hill Ln', 'Vancouver', 'BC', 'M8V 4A2', true
),

  (3, 'house 3', 'a house', 'https:
//source.unsplash.com/random/150x150', 'https:
//source.unsplash.com/random', 100, 1, 1, 2, 'Canada', '2690 Walnut Hill Ln', 'Vancouver', 'BC', 'M8V 4A2', false
);

INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 2, 3),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 3, 1);

INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 3, 3, 5, 'messages'),
  (1, 2, 1, 2, 'messages'),
  (3, 1, 2, 4, 'messages');