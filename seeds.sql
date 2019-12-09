INSERT INTO department (name) VALUES ("Marketing");

INSERT INTO department (name) VALUES ("Finance");

INSERT INTO department (name) VALUES ("Sales");

INSERT INTO role (title, salary, department_id) VALUES ("General Manager", "200000", "1");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", "150000", "2");

INSERT INTO role (title, salary, department_id) VALUES ("Assistant Manager", "100000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kyle", "Kendall", 1, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mindy", "Mastrine", 2, 12);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Steve", "Bourn", 4, 1);