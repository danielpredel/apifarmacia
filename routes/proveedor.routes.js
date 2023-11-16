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
    body('NombreProveedor').not().isEmpty().isString(),
    body('EdadProveedor').not().isEmpty(),
    body('TelefonoProveedor').not().isEmpty().isString(),
    body('DireccionProveedor').not().isEmpty().isString()
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
    body('IdProveedor').not().isEmpty(),
    body('NombreProveedor').not().isEmpty().isString(),
    body('EdadProveedor').not().isEmpty(),
    body('TelefonoProveedor').not().isEmpty().isString(),
    body('DireccionProveedor').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.IdProveedor;
    let values = {
        NombreProveedor: req.body.NombreProveedor,
        EdadProveedor: req.body.EdadProveedor,
        TelefonoProveedor: req.body.TelefonoProveedor,
        DireccionProveedor: req.body.DireccionProveedor
    }
    query.edit(connection, "proveedor", "IdProveedor", id, values, (data => {
        res.json(data);
    }))
});

// Ruta para eliminar un proveedor por su ID (PK)
router.delete('/proveedor/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "proveedor", "IdProveedor", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Proveedor eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el proveedor'
            });
        }
    }));
});
module.exports = router;