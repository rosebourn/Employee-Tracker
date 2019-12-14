var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
        viewDepartment();
      }
      if (res.option === "View all roles") {
        viewRole();
      }
      if (res.option === "View all employees") {
        viewEmployee();
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
    });

  function viewDepartment() {
    connection.query("SELECT name FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      askUser();
    })
  }

  function viewRole() {
    connection.query("SELECT title, salary, department_id FROM role", function (err, res) {
      if (err) throw err;
      console.table(res);
      askUser();
    })
  }

  function viewEmployee() {
    connection.query("SELECT first_name, last_name, role_id, manager_id FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      askUser();
    })
  }

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
    connection.query("SELECT * FROM employee", function (err, results) {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "choice",
            choices: function () {
              var employee = [];
              for (var i = 0; i < results.length; i++) {
                employee.push(results[i].id + " " + results[i].first_name + " " + results[i].last_name);
              }
              return employee;
            },
            message: "Which employee would you like to update?"
          },
          {
            type: "input",
            name: "updatedFirst",
            message: "Employee First Name: "
          },
          {
            type: "input",
            name: "updatedLast",
            message: "Employee Last Name: "
          },
          {
            type: "input",
            name: "updatedRole",
            message: "Role ID: "
          },
          {
            type: "input",
            name: "updatedManager",
            message: "Manager ID: "
          },
        ])
        .then((res) => {
          var fullName = res.choice.split(" ");
          // var id = results.filter(obj => obj.first_name == fullName[0])[0].id;
          var id = fullName[0];
          console.log(res.choice);
          console.log(res.updatedFirst);
          console.log(res.updatedLast);
          console.log(res.updatedRole);
          console.log(res.updatedManager);

        
        
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              first_name: res.updatedFirst,
              last_name: res.updatedLast,
              role_id: res.updatedRole,
              manager_id: res.updatedManager
            },
            {
              id: id
            },
            function (err, res) {
              if (err) throw err;
              console.log("Employee Updated")
            }
          ]
        )

    })
  })
  }
}
