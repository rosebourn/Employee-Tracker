var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "emp_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  askUser();
});

function askUser() {
  inquirer
      .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", "Update employee role"]
        }
      ])

  .then((res) => {
    console.log(res);
    if (res.option === "View all departments") {
      connection.query("SELECT name FROM department", function(err, res) {
        if (err) throw err;
        console.log(res);
      })
    }
    if (res.option === "View all roles") {
      connection.query("SELECT title FROM role", function(err, res) {
        if (err) throw err;
        console.log(res);
      })
    }
    if (res.option === "View all employees") {
      connection.query("SELECT first_name, last_name FROM employee", function(err, res) {
        if (err) throw err;
        console.log(res);
      })
    }
    if (res.option === "Add department") {
      addDepartment();
    }
  })
  
  function addDepartment() {
    inquirer
      .prompt([
    {
      type: "input",
      name: "department name",
      message: "Department Name: "
    }
  ])
  .then((res) => {
    console.log(res);
    var deptName = res;

    connection.query(
      "INSERT INTO department SET ?",
      {
        name: deptName
      },
      function(err, res) {
        if (err) throw err;
        console.log(res + "department inserted");
      }
    )

   
  })

}
    
      
    }
     
    
    // function insertDept(name) {
    //   connection.query("INSERT INTO department (name) VALUES ?",
    //   [name],
    //   function (err, response) {
    //     if (err) throw err;
    //     console.log("\nDepartment successfully added.")
    //   })
    // }
    // insertDept();