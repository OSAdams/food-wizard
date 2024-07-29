const pg = require('pg');

const db = new pg.Pool({
  /* Comment for sensitive information security check */
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = db;
