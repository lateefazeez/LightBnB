const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
      SELECT * FROM users;
    `)
    .then(users => {
      let userData;
      users.rows.map(user => {
        if (user.email.toLowerCase() === email.toLowerCase()) {
          userData = user;
        } else {
          user = null;
        }
      });
      return userData;
    })
    .catch(err => console.log(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
    SELECT * FROM users;
  `)
    .then(users => {
      let userData;
      users.rows.map(user => {
        if (user.id === id) {
          userData = user;
        } else {
          user = null;
        }
      });
      return userData;
    })
    .catch(err => console.log(err.message));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;

  return pool
    .query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [name, email, password])
    .then(user => {
      return user.rows;
    })
    .catch(err => console.log(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  return pool
    .query(`
      SELECT * FROM reservations
      JOIN users ON guest_id = users.id
      JOIN properties ON properties.id = property_id
      WHERE guest_id = $1
      LIMIT $2;
    `, [guest_id, limit])
    .then(reservations => {
      return reservations.rows;
    })
    .catch(err => console.log(err.message));
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  let searchResult = searchProperties(queryString, queryParams, options, limit);
  
  console.log(searchResult.qString, searchResult.qParams);
  return pool
    .query(searchResult.qString, searchResult.qParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

const searchProperties = (queryString, queryParams, options, limit) => {
  let result = {};

  if (options.city && options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`%${options.city}%`, options.minimum_price_per_night, options.maximum_price_per_night);
    queryString += `WHERE city LIKE $${queryParams.length - 2} AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  } else if (options.city && options.minimum_price_per_night) {
    queryParams.push(`%${options.city}%`, options.minimum_price_per_night);
    queryString += `WHERE city LIKE $${queryParams.length - 1} AND cost_per_night >= $${queryParams.length}`;
  } else if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night, options.maximum_price_per_night);
    queryString += `WHERE cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  } else if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id, limit);
    queryString += `
    GROUP BY properties.id
    HAVING properties.owner_id = $${queryParams.length - 1}
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;
  } else {
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }
  result['qString'] = queryString;
  result['qParams'] = queryParams;
  return result;
};
exports.addProperty = addProperty;
