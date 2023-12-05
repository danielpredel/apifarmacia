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
    },
    consulta1: (connection, nombre,callback) => {
        connection.query(`CREATE OR REPLACE VIEW Doctor_Consultas_clientes AS
        SELECT
          MAX(doctor.IdDoctor) AS Id_Doctor,
          MAX(doctor.NombreDoctor) AS Nombre_Doctor,
          MAX(cliente.IdCliente) AS Id_Cliente,
          MAX(cliente.NombreCliente) AS Nombre_Cliente,
          MAX(cliente.TelefonoCliente) AS Telefono_Cliente,
          MAX(consulta.ConsultarPrecio) AS Consultar_Precio,
          MAX(consulta.ConsultarFecha) AS FECHA_CONSULTA
        FROM
          doctor, cliente, consulta
        WHERE
          doctor.IdDoctor = consulta.Doctor_IdDoctor
          AND consulta.Cliente_IdCliente = cliente.IdCliente
         
        GROUP BY
          consulta.ConsultarFecha;`,nombre, (err, results) => {
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
    getRowsp: (connection, callback) => {
        connection.query(`select Id_Doctor,Nombre_Doctor, Id_Cliente,Nombre_Cliente,Telefono_Cliente,Consultar_Precio, DATE_FORMAT(FECHA_CONSULTA,'%Y-%m-%d')as fecha from Doctor_Consultas_clientes;`, (err, results) => {
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
    sumav1: (connection, callback) => {
        connection.query(`select count(*)as cantidad, sum(Consultar_Precio)as fecha from Doctor_Consultas_clientes;`, (err, results) => {
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
    vista2: (connection, callback) => {
        connection.query(`CREATE  OR REPLACE VIEW vista_producto_proveedor AS
        SELECT 
          producto.IdProducto,
          producto.NombreProducto,
          producto.MarcaProducto,
          producto.ExistenciaProducto,
          proveedor.IdProveedor,
          proveedor.NombreProveedor,
          proveedor.TelefonoProveedor
        FROM 
          producto, proveedor, producto_proveedor
        WHERE 
          producto_proveedor.Producto_IdProducto = producto.IdProducto
          AND producto_proveedor.Proveedor_IdProveedor = proveedor.IdProveedor;
        `, (err, results) => {
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
  
    getRowspv2: (connection, callback) => {
        connection.query(`SELECT * FROM vista_producto_proveedor`, (err, results) => {
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
    vista3: (connection, callback) => {
        connection.query(`CREATE  OR REPLACE VIEW vista_ventas AS
        SELECT 
          cliente.IdCliente,
          cliente.NombreCliente,
          venta.IdVenta,
          venta.TotalVenta,
          empleado.IdEmpleado,
          empleado.NombreEmpleado
        FROM 
          cliente, venta, empleado
        WHERE 
          cliente.IdCliente = venta.Cliente_IdCliente
          AND empleado.IdEmpleado = venta.Empleado_IdEmpleado;
        
        `, (err, results) => {
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
    getRowspv3: (connection, callback) => {
        connection.query(`SELECT * FROM vista_ventas`, (err, results) => {
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
    Roll: (connection, callback) => {
        connection.query(`SELECT COALESCE(Doctor_IdDoctor, 'Total') AS Doctor,doctor.NombreDoctor, COALESCE(DATE_FORMAT(consulta.ConsultarFecha, '%m'), 'Total') AS Mes, SUM(consulta.ConsultarPrecio) AS TotalPrecio FROM consulta,doctor WHERE consulta.Doctor_IdDoctor=doctor. IdDoctor GROUP BY Doctor_IdDoctor, Mes WITH ROLLUP;
    `, (err, results) => {
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
    pro: (connection, callback) => {
        connection.query(`CALL ObtenerProductosBajos();`, (err, results) => {
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
}