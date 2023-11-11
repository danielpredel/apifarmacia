module.exports = {
    describe: (connection, table, callback) => {
        connection.query(`DESCRIBE ${table}`, (err, results) => {
            // console.log(`describe ${table}`)
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                success: true
            });
        })
    },
    getAll: (connection, table, callback) => {
        connection.query(`select * from ${table}`, (err, results) => {
            // console.log(`all ${table}`)
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                success: true
            });
        })
    },
    getRow: (connection, table, pkColumn, body, callback) => {
        connection.query(`SELECT * FROM ${table} where ${pkColumn} = ?`, body, (err, results) => {
            // console.log(`row ${table} + ${pkColumn} `)
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                success: true
            });
        })
    },
    new: (connection, table, body, callback) => {
        connection.query(`insert into ${table} SET ?`, body, (err, results) => {
            // console.log(`insert ${table}`)
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                success: true
            });
        });
    },
    edit: (connection, table, pkColumn, id, values, callback) => {
        connection.query(`update ${table} SET ? where ${pkColumn} = ?`, [values, id], (err, results) => {
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                success: true
            });
        });
    },
    delete: (connection, table, pkColumn, pkValue, callback) => {
        connection.query(`DELETE FROM ${table} WHERE ${pkColumn} = ?`, pkValue, (err, results) => {
            if (err) {
                callback({
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                success: true
            });
        });
    }
}