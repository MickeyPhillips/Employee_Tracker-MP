const db = require('./db/connection');
const inquirer = require('inquirer');
const create = require('./lib/create')
const { viewEmployees, viewDepartments, viewRoles } = require('./lib/read')
const update = require('./lib/update')
const destroy = require('./lib/destroy')


db.connect(err => {
    if(err)throw err;
    console.log('Connected to the Database.')
    init()
});
const init = () => {
    viewEmployees()
}
