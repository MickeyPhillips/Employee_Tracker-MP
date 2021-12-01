const db = require('./db/connection');
const inquirer = require('inquirer');

db.connect(err => {
    if(err)throw err;
    console.log('Connected to the Database.')
});