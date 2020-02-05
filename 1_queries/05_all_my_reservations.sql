SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1 AND now()
::date > reservations.end_date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;