// Import and require mysql2
const inquirer = require("inquirer")
const mysql = require('mysql2');
require("dotenv").config()

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL Password
    password: process.env.DB_PW,
    database: 'ggldesign_db'
  },
  console.log(`Connected to the ggldesign_db database.`)
);
userinput()
// QUery database using count favorite_books group by in_Stock
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//  console.log(results);
// });

// QUery database using sum(), max(), MIN() AVG  favorite_books group by sections
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
// console.log(results);
// });

function userinput() {
  inquirer.prompt({
    type: "list",
    name: "Menu",
    message: "What would you like to enter?",
    choices: [
      "View all department",
      "View all employees",
      "View all roles",
      "add a department",
      "add role",
      "add employee",
      "update employee role"
    ]

  }).then((answer) => {
    if (answer.Menu === "View all department") {
      viewDepartment()
    }
    else if (answer.Menu === "View all employees") {
      viewEmployees()
    }
    else if (answer.Menu === "View all roles") {
      viewRoles()
    }
  })
}

function viewDepartment() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    userinput();
  });
}
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    userinput();
  });
}
function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    userinput();
  });
}
function addDepartment() {
  inquirer.prompt(
    {
      type: "input",
      name: "name",
      message: "please enter department name",
    }
  ) .then((answer) => {
    db.query('INSERT INTO department (name) VALUE (?)', [
      answer.name
    ], function (err, results) {
      console.table(results);
      userinput();
    });
  })
}