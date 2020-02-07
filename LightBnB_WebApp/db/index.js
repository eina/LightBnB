const { Pool } = require("pg");

const config = {
  user: "vagrant",
  host: "localhost",
  database: "lightbnb",
  password: "123"
};

const pool = new Pool(config);

module.exports = pool;
