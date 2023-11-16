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

function userinput() {
  inquirer.prompt({
    type: "list",
    name: "Menu",
    message: "What would you like to do?",
    choices: [
      "View All Department",
      "Add Department",
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
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
    else if (answer.Menu === "Update Employee Role") {
      UpdateEmployeeRole()
    }
    else if (answer.Menu === "View All Roles") {
      viewRoles()
    }
    else if (answer.Menu === "Add Role") {
      AddRole()
    }
  })
}

function viewDepartment() {
  db.query('SELECT department.id, department.name FROM Department', function (err, results) {
    console.table(results);
    userinput();
  });
}
function viewEmployees() {
  db.query('SELECT employee.first_name, employee.last_name, CONCAT(manager.first_name," ",manager.last_name) AS manager, role.title AS title FROM employee JOIN role ON employee.role_id = role.id JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {
    console.table(results);
    userinput();
  });
}
function viewRoles() {
  db.query('SELECT role.id, role.title, role.salary FROM role', function (err, results) {
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
    db.query('INSERT INTO department (name) VALUE (?)', [
      answer.name
    ], function (err, results) {
      console.table(results);
      console.log(`Added ${answer.name} to Department table`)
      userinput();
    });
  })
}
async function AddEmployee() {
  const roleData = await db.promise().query('SELECT * FROM role')
//  console.log(roleData)
  const roleArray = roleData[0].map(role =>({
    name: role.title,
    value: role.id
  }))
 // console.log(roleArray)
 const EmployeeData = await db.promise().query('SELECT * FROM employee')
 const ManagerArray = EmployeeData[0].map(employee =>({
  name: employee.first_name +" "+ employee.last_name,
  value: employee.id
}))
  inquirer.prompt([
    {
      type: "input",
      name: "FirstName",
      message: "What is the employee s first name? ",
    },
    {
      type: "input",
      name: "LastName",
      message: "What is the employee s last name? ",
    },
  // select role
  {
  type: "list", 
  name: "roleName",
  message: "What is the employee s role?",
  choices: roleArray
    },
  {
  type: "list", 
  name: "manager",
  message: "What is the manager name?",
  choices: ManagerArray
    } 
  ]) .then((answer) => {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)', [
      answer.FirstName, answer.LastName, answer.roleName, answer.manager
    ], function (err, results) {
      console.table(results)
      console.log(`Added ${answer.FirstName} to Employee table`)
      userinput();
    });
  })
}
async function UpdateEmployeeRole() {
  const roleData = await db.promise().query('SELECT * FROM role')
//  console.log(roleData)
  const roleArray = roleData[0].map(role =>({
    name: role.title,
    value: role.id
  }))
 // console.log(roleArray)
 const EmployeeData = await db.promise().query('SELECT * FROM employee')
 const ManagerArray = EmployeeData[0].map(employee =>({
  name: employee.first_name +" "+ employee.last_name,
  value: employee.id
}))
  inquirer.prompt([
  // select role
  {
  type: "list", 
  name: "roleName",
  message: "What is the employee s new role?",
  choices: roleArray
    },
  {
  type: "list", 
  name: "manager",
  message: "Who is the employee name?",
  choices: ManagerArray
    } 
  ]) .then((answer) => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
      answer.roleName, answer.manager
    ], function (err, results) {
      console.table(results)
      console.log(`Added ${answer.roleName, answer.manager} to Employee table`)
      userinput();
    });
  })
}

// Add Role
async function AddRole() {
  const depData = await db.promise().query('SELECT * FROM department')
//  console.log(depData)
  const DepArray = depData[0].map(department =>({
    name: department.name,
    value: department.id
  }))
  inquirer.prompt([
    {
      type: "input",
      name: "RoleTitle",
      message: "What is the name of the role? ",
    },
    {
      type: "input",
      name: "RoleSalary",
      message: "What is the salary of the role? ",
    },
  // select role
  {
  type: "list", 
  name: "RoleDepName",
  message: "Which department does the role belong to?",
  choices: DepArray
    }
  ]) .then((answer) => {
    db.query('INSERT INTO role (title, salary, department_id) VALUE (?,?,?)', [
      answer.RoleTitle, answer.RoleSalary, answer.RoleDepName
    ], function (err, results) {
    //  console.table(results)
      console.log(`Added ${answer.RoleTitle} to Role table`)
      userinput();
    });
  })
}