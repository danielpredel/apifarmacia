const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla venta
router.get('/venta_description', [], (req, res) => {
    query.describe(connection, "venta", (data => {
        res.json(data);
    }))
});

// Consultar todos las ventas
router.get('/venta_all', [], (req, res) => {
    query.getAll(connection, "venta", (data => {
        res.json(data); 
    }))
});

// Consultar un venta por su id (PK)
router.get('/venta/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "venta", "idventa", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nueva venta
router.post('/venta_new', [
    body('fechav').not().isEmpty().isString(),
    body('idventa').not().isEmpty().isString(),
    body('Cliente_idCliente').not().isEmpty().isString(),
    body('Empleado_idEmpleado').not().isEmpty().isString(),
    body('totalVenta').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let body = req.body;
    query.new(connection, "venta", body, (data => {
        res.json(data);
    }))
});

// Ruta para eliminar un venta por su ID (PK)
router.delete('/venta/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "venta", "idventa", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Venta eliminada con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar la Venta'
            });
        }
    }));
});

module.exports = router;