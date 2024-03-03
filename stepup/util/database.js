const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodecomplete',
    password: 'das@55555'
});

module.exports = {
    execute: (sql, values) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
};