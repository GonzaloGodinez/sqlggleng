INSERT INTO department ( name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");
       

INSERT INTO role (title, salary, department_id)
VALUES ("Sales lead", 100000, 1),
       ("Salesperson", 80000, 2),
        ("Lead Engineer", 120000, 3),
         ("Software Engineer", 120000, 4),
          ("Account Manager", 160000, 5),
           ("Accountant", 160000, 1),
           ("Legal Team Lead", 250000, 2),
           ("Lawyer", 190000, 3);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, 2),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, 4),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, 6),
        ("Tom", "Allen", 8, 7);
