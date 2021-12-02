const db = require('../db/connection')
require('console.table')

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
    })
}

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
    })
}

const viewRoles = () => {
    const sql = `SELECT * FROM roles`
    
    db.query(sql, (err, rows) => {
        if(err) {
            console.log(err)
        }
        console.table(rows)
    })
}


module.exports = {
    viewEmployees,
    viewDepartments,
    viewRoles
}