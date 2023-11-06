const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla producto_venta
router.get('/producto_venta_description', [], (req, res) => {
    query.describe(connection, "producto_venta", (data => {
        res.json(data);
    }))
});

// Consultar todos los registro de producto_venta
router.get('/producto_venta_all', [], (req, res) => {
    query.getAll(connection, "producto_venta", (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo registro en producto_venta
router.post('/producto_venta_new', [
    body('Producto_idProducto').not().isEmpty(),
    body('Venta_idVenta').not().isEmpty().isString(),
    body('cantidadpv').not().isEmpty()
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
    query.new(connection, "producto_venta", body, (data => {
        res.json(data);
    }))
});

module.exports = router;