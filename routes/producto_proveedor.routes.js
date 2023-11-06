const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla producto_proveedor
router.get('/producto_proveedor_description', [], (req, res) => {
    query.describe(connection, "producto_proveedor", (data => {
        res.json(data);
    }))
});

// Consultar todos los registro de producto_proveedor
router.get('/producto_proveedor_all', [], (req, res) => {
    query.getAll(connection, "producto_proveedor", (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo registro en producto_proveedor
router.post('/producto_proveedor_new', [
    body('Producto_idProducto').not().isEmpty(),
    body('Proveedor_idProveedor').not().isEmpty()
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
    query.new(connection, "producto_proveedor", body, (data => {
        res.json(data);
    }))
});

module.exports = router;