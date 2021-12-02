const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table')

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
            case 'Quit':
                db.end()
                return
        }
    })
}
// Create

// Read
const viewEmployees = () => {
    const sql = `SELECT * FROM employees`
    
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
    const sql = `SELECT roles.*, departments.name AS department
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

