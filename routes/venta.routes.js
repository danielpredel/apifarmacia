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
    body('Cliente_idCliente').not().isEmpty(),
    body('Empleado_idEmpleado').not().isEmpty(),
    body('totalVenta').not().isEmpty()
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

// update de un venta
router.put('/venta_edit', [
    body('fechav').not().isEmpty().isString(),
    body('idventa').not().isEmpty().isString(),
    body('Cliente_idCliente').not().isEmpty(),
    body('Empleado_idEmpleado').not().isEmpty(),
    body('totalVenta').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.idventa;
    let values = {
        idventa:  id,
        fechav: req.body.fechav,
        Cliente_idCliente: req.body.Cliente_idCliente,
        Empleado_idEmpleado: req.body.Empleado_idEmpleado,
        totalVenta: req.body.totalVenta
    }
    query.edit(connection, "venta", "idventa", id, values, (data => {
        res.json(data);
    }))
});

module.exports = router;