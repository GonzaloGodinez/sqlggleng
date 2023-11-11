INSERT INTO department ( name)
VALUES ("Sales"),
       ("Finance"),
       ("Purchasing");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 80000, 1),
       ("Sales", 75000, 2);
       
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Star TA", "B", 1),
        ("Star TA", "B", 1);
