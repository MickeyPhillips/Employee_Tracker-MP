const mysql =  require('mysql2');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "x3Yh2$q8KkOPt0",
        database: "employee_tracker"
    },
    console.log( 'Connected to employee_tracker_databases')
);

module.exports = db;