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
            'Add employee',
            'Add role',
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
            case 'Add employee':
                addEmployee()
                break
            case 'Add role':
                addRole()
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

const addEmployee = () => {
    const sql = `SELECT * FROM employees`
    db.query(sql, (err,rows) => {
        if(err){
            console.log(err)
        }
        console.table(rows)
        inquirer.prompt([
            {
                name: 'fname',
                type: 'input',
                message: 'First Name: ',
                validate: fnameInput => {
                    if(fnameInput){
                        return true
                    }
                    else{
                        console.log('Enter first name: ')
                        return false
                    }
                }
            },
            {
                name: 'lname',
                type: 'input',
                message: 'Last Name: ',
                validate: lnameInput => {
                    if(lnameInput){
                        return true
                    }
                    else{
                        console.log('Enter last name: ')
                        return false
                    }
                }
            },
            {
                name: 'role_ID',
                type: 'input',
                message: 'Enter role id: ',
                validate: roleInput => {
                    if(roleInput % 1 >= 0){
                        return true
                    }
                    else{
                        console.log('Enter role id: ')
                        return false
                    }
                }
            },
            {
                name: 'manager_ID',
                type: 'input',
                message: 'Enter manager id for employee: ',
                validate: roleInput => {
                    if(roleInput % 1 >= 0){
                        
                        return true
                    }
                    else{
                        console.log('Enter manager id for employee: ')
                        return false
                    }
                }
            }
        ])
        .then(body => {
            const params = [body.fname, body.lname, body.role_ID, body.manager_ID]
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
            db.query(sql, params, (err, rows) => {
                if(err) {
                    console.log(err)
                }
                viewEmployees()
                //init()
            })
        })
    })
        
    
    
}

const addRole = () => {
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Role title: ',
                validate: titleInput => {
                    if(titleInput){
                        return true
                    }
                    else{
                        console.log('Enter role title: ')
                        return false
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Salary: ',
                validate: salaryInput => {
                    if(salaryInput % 1 >= 0){
                        return true
                    }
                    else{
                        console.log('Enter salary(number without currency symbol): ')
                        return false
                    }
                }
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter department ID for the role you want: ',
                validate: salaryInput => {
                    if(salaryInput % 1 >= 0){
                        return true
                    }
                    else{
                        console.log('Enter department ID for the role you want: ')
                        return false
                    }
                }
            }
        ])
        .then(body => {
            const params = [body.title, body.salary, body.department_id]
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
            db.query(sql, params, (err, rows) => {
                if(err) {
                    console.log(err)
                }
                viewRoles()
                init()
            })
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

