const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table')
// CTRL + F 'Create'
// CTRL + F 'Read'
// CTRL + F 'Update'
// CTRL + F 'Destroy'
db.connect(err => {
    if(err)throw err;
    console.log('Connected to the Database.')
    init()
});

const init = () => {
    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all employees',
            'View all roles',
            'Add department',
            'Quit'
        ]
    })
    .then(res => {
        switch(res.choices){
            case 'View all departments':
                viewDepartments()
                break
            case 'View all employees':
                viewEmployees()
                break
            case 'View all roles':
                viewRoles()
                break
            case 'Add department':
                addDepartment()
                break
            case 'Quit':
                db.end()
                return
        }
    })
}
// Create
const addDepartment = () => {
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'What is the new Department name?',
        validate: departmentInput => {
            if(departmentInput) {
                return true
            }
            else {
                console.log('What is the new Department name?')
                return false
            }
        }
    })
    .then(params => {
        const sql = `INSERT INTO departments (name) VALUES (?)`
        db.query(sql, params.newDepartment, (err, rows) => {
            if(err) {
                console.log(err)
            }
            viewDepartments()
            init()
        })
    })
}
// Read
const viewEmployees = () => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT (manager.first_name,' ', manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
        init()
    })
}

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)      
        init()  
    })
}

const viewRoles = () => {
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
        init()       
    })
}

const viewEmployeesByManager = () => {}

const viewEmployeesByDepartment = () => {}
// Update

// Destroy

