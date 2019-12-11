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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  askUser();
});

function askUser() {
  inquirer
    .prompt(
      {
        type: "list",
        message: "What would you like to do?",
        name: "option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role"
        ]
      }
    )

    .then((res) => {
      console.log(res.option);
      if (res.option === "View all departments") {
        connection.query("SELECT name FROM department", function (err, res) {
          if (err) throw err;
          console.log(res);
        })
      }
      if (res.option === "View all roles") {
        connection.query("SELECT title FROM role", function (err, res) {
          if (err) throw err;
          console.log(res);
        })
      }
      if (res.option === "View all employees") {
        connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
          if (err) throw err;
          console.log(res);
        })
      }
      if (res.option === "Add department") {
        addDepartment();
      }
      if (res.option === "Add role") {
        addRole();
      }
      if (res.option === "Add employee") {
        addEmployee();
      }
      if (res.option === "Update employee role") {
        updateEmp();
      }
    })

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Department Name: "
        }
      ])
      .then((res) => {

        console.log(res.departmentName)

        connection.query(
          "INSERT INTO department SET ?",
          {
            name: res.departmentName
          },
          function (err, res) {
            if (err) throw err;
            console.log("Department Added");
            askUser();
          }
        )


      })

  }

  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "Role: "
        },
        {
          type: "input",
          name: "salary",
          message: "Starting Salary: "
        },
        {
          type: "input",
          name: "deptId",
          message: "Department ID: "
        }
      ])
      .then((res) => {
        console.log(res.roleName);
        console.log(res.salary);
        console.log(res.deptId);

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.roleName,
            salary: res.salary,
            department_id: res.deptId

          },
          function (err, res) {
            if (err) throw err;
            console.log("Role Added");
            askUser();
          }
        )
      }
      )
  }
    
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "First Name: "
        },
        {
          type: "input",
          name: "lastName",
          message: "Last Name: "
        },
        {
          type: "input",
          name: "roleId",
          message: "Role ID: "
        },
        {
          type: "input",
          name: "managerId",
          message: "Manager ID: "
        }
      ])
      .then((res) => {
        console.log(res.firstName);
        console.log(res.lastName);
        console.log(res.roleId);
        console.log(res.managerId);

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleId,
            manager_id: res.managerId
          },
          function (err, res) {
            if (err) throw err;
            console.log("Employee Added");
            askUser();
          }
        )
      })
  }

  function updateEmp() {
    
  }
}
