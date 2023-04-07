const Pool = require("pg").Pool;
const pool = new Pool({
  user: "jj",
  password: "password123",
  host: "localhost",
  port: 5432,
  database: "servertodo",
});
module.exports = pool;
