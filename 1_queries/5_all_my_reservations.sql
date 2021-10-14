SELECT properties.id as id, properties.title as title, properties.cost_per_night as cost_per_night, start_date, avg(rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  JOIN reservations ON properties.id = reservations.property_id
  WHERE reservations.guest_id = 1
  GROUP BY properties.id, properties.title, reservations.start_date
  ORDER BY start_date ASC
  LIMIT 10;