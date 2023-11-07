const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla proveedor
router.get('/proveedor_description', [], (req, res) => {
    query.describe(connection, "proveedor", (data => {
        res.json(data);
    }))
});

// Consultar todos los proveedores
router.get('/proveedor_all', [], (req, res) => {
    query.getAll(connection, "proveedor", (data => {
        res.json(data); 
    }))
});

// Consultar un proveedor por su id (PK)
router.get('/proveedor/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "proveedor", "idProveedor", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo proveedor
router.post('/proveedor_new', [
    body('idProveedor').not().isEmpty(),
    body('prnombre').not().isEmpty().isString(),
    body('predad').not().isEmpty().isString(),
    body('prtelefono').not().isEmpty().isString(),
    body('prdireccion').not().isEmpty().isString()
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
    query.new(connection, "proveedor", body, (data => {
        res.json(data);
    }))
});

// update de un proveedor
router.put('/proveedor_edit', [
    body('idProveedor').not().isEmpty(),
    body('prnombre').not().isEmpty().isString(),
    body('predad').not().isEmpty().isString(),
    body('prtelefono').not().isEmpty().isString(),
    body('prdireccion').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.idProveedor;
    let values = {
        idProveedor:  id,
        prnombre: req.body.prnombre,
        predad: req.body.predad,
        prtelefono: req.body.prtelefono,
        prdireccion: req.body.prdireccion
    }
    query.edit(connection, "proveedor", "idProveedor", id, values, (data => {
        res.json(data);
    }))
});

module.exports = router;