module.exports = {
    describe: (connection, table, callback) => {
        connection.query(`DESCRIBE ${table}`, (err, results) => {
            // console.log(`describe ${table}`)
            if (err) {
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                id: null,
                success: true
            });
        })
    },
    getAll: (connection, table, callback) => {
        connection.query(`select * from ${table}`, (err, results) => {
            // console.log(`all ${table}`)
            if (err) {
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                id: null,
                success: true
            });
        })
    },
    getRow: (connection, table, pkColumn, body, callback) => {
        connection.query(`SELECT * FROM ${table} where ${pkColumn} = ?`, body, (err, results) => {
            // console.log(`row ${table} + ${pkColumn} `)
            if (err) {
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: results,
                id: null,
                success: true
            });
        })
    },
    new: (connection, table, body, callback) => {
        connection.query(`insert into ${table} SET ?`, body, (err, results) => {
            // console.log(`insert ${table}`)
            if (err) {
                callback({
                    array: null,
                    id: null,
                    success: false,
                    err: JSON.stringify(err)
                });
                return;
            }
            callback({
                array: null,
                id: null,
                success: true
            });
        });
    }
}