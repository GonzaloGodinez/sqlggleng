INSERT INTO department ( name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");
       

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 80000, 1),
       ("Sales", 75000, 1),
        ("Lead Engineer", 120000, 2),
         ("Software Engineer", 95000, 2),
          ("Account Manager", 85000, 3),
           ("Legal Team Lead", 98000, 4),
           ("Lawyer", 120000, 4);
       
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
        ("Mike", "Chan", 2),
        ("Ashley", "Rodriguez", 2);
