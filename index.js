const db = require('./db/connection');
const inquirer = require('inquirer');
const create = require('./lib/create')
const read = require('./lib/read')
const update = require('./lib/update')
const destroy = require('./lib/destroy')

db.connect(err => {
    if(err)throw err;
    console.log('Connected to the Database.')
    init()
});
const init = () => {
    console.log('Hello I enjoy food')
}
