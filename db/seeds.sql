INSERT INTO departments (name) 
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles (title, salary, department_id) 
VALUES
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Lead Accountant', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, null),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, null),
    ('Kevin', 'Tupik', 4, 3),
    ('Jane', 'Smith', 5, null),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 6, 5),
    ('Tom', 'Allen', 7, null),
    ('Maria', 'Grayson', 8, 8),
    ('Tammer', 'Galal', 8, 8);