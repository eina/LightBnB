-- SELECT properties.id, title, cost_per_night, avg(rating) as average_rating
-- FROM properties
--   JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%' AND cost_per_night >= 10000
-- GROUP BY properties.id
-- HAVING avg(rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 20;

SELECT properties.*,
  avg(property_reviews.rating) as average_rating
FROM properties
  JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%' AND cost_per_night >= 10000
GROUP BY properties.id
HAVING avg(rating) >= 5
ORDER BY cost_per_night
LIMIT 20;