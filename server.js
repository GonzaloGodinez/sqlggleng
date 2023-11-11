// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL Password
    password: '',
    database: 'ggldesign_db'
  },
  console.log(`Connected to the ggldesign_db database.`)
);

// QUery database using count favorite_books group by in_Stock
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});

// QUery database using sum(), max(), MIN() AVG  favorite_books group by sections
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});
