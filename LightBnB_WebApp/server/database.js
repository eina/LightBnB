const pool = require("../db/index");
pool.connect();

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(res => {
      if (res.rows && res.rows.length) {
        return res.rows[0];
      } else {
        return Promise.resolve(null);
      }
    })
    .catch(err => console.log("query error", err));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then(res => res.rows[0])
    .catch(err => console.log("query error", err));
  // return Promise.resolve(users[id]);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const { name, email, password } = user;
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [
      name,
      email,
      password
    ])
    .then(res => res.rows[0].id)
    .catch(err => console.error("query error", err));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1 AND now()::date > reservations.end_date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;`;
  return pool
    .query(queryString, [guest_id])
    .then(res => res.rows)
    .catch(err => console.log("query error", err));
  // return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const {
    city,
    owner_id,
    minimum_price_per_night,
    maximum_price_per_night,
    minimum_rating
  } = options;
  const queryParams = [];
  let queryPrefix = connect => (connect ? "AND" : "WHERE");
  let queryString = `
  SELECT properties.*, 
  avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += `${queryPrefix(true)} city LIKE $${queryParams.length} `;
  }

  // if (!(city || owner_id || minimum_price_per_night || maximum_price_per_night, minimum_rating)) {
  //   queryString += `WHERE `;
  // } else {
  //   queryString += `AND `;
  // }

  if (owner_id) {
    queryParams.push(owner_id);
    queryString += `${queryPrefix(queryParams.length === 1)} properties.owner_id = $${
      queryParams.length
    } `;
  }

  if (minimum_price_per_night) {
    queryParams.push(Number(minimum_price_per_night) * 100);
    queryString += `${queryPrefix(queryParams.length === 1)} cost_per_night >= $${
      queryParams.length
    }  `;
  }

  if (maximum_price_per_night) {
    queryParams.push(Number(maximum_price_per_night) * 100);
    queryString += `${queryPrefix(queryParams.length === 1)} cost_per_night <= $${
      queryParams.length
    } `;
  }

  queryString += `
  GROUP BY properties.id    
  `;

  if (minimum_rating) {
    queryParams.push(Number(minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `    
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then(res => {
    return res.rows;
  });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryString = `INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_coders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)  RETURNING *;`;
  let queryParams = Object.values(property);
  console.log("hi properties", property, queryParams.length);

  return pool.query(queryString, queryParams).then(res => res.rows);
};
exports.addProperty = addProperty;
