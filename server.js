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
      "View All Department",
      "Add Department",
      "View All Employees",
      "Add Employee",
      "Add First Name"
      "Add Last Name"
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "Add Salary",
      "Quit"
    ]

  }).then((answer) => {
    if (answer.Menu === "View All Department") {
      viewDepartment()
    }
    else if (answer.Menu === "Add Department") {
      AddDepartment()
    }
    else if (answer.Menu === "View All Employees") {
      viewEmployees()
    }
    else if (answer.Menu === "Add Employee") {
      AddEmployee()
    }
    else if (answer.Menu === "Add First Name") {
      AddFirstname()
    }
    else if (answer.Menu === "Add Last Name") {
      AddLastname()
    }
    else if (answer.Menu === "Update Employee Role") {
      UpdateEmployeeRole()
    }
    else if (answer.Menu === "View All Roles") {
      viewRoles()
    }
    else if (answer.Menu === "Add Role") {
      AddRole()
    }
    else if (answer.Menu === "Add Salary") {
      AddSalary()
    }
  })
}

function viewDepartment() {
  db.query('SELECT * FROM Department', function (err, results) {
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
function AddDepartment() {
  inquirer.prompt(
    {
      type: "input",
      name: "name",
      message: "Please enter Department name",
    }
  ) .then((answer) => {
    db.query('INSERT INTO Department (name) VALUE (?)', [
      answer.name
    ], function (err, results) {
      console.table(results);
      console.log(`Added ${answer.name} to Department table`)
      userinput();
    });
  })
}
function AddEmployee() {
  inquirer.prompt(
    {
      type: "input",
      name: "name",
      message: "What is the employee s first name? ",
    }
  ) .then((answer) => {
    db.query('INSERT INTO Employee (name) VALUE (?)', [
      answer.name
    ], function (err, results) {
      console.table(results);
      console.log(`Added ${answer.name} to Employee table`)
      userinput();
    });
  })
}