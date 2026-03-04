const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "evx",
  password: "67yuhjnm*",
  database: "scconvenios"
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { query };
