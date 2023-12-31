const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla producto_pedido
router.get('/producto_pedido_description', [], (req, res) => {
    query.describe(connection, "producto_pedido", (data => {
        res.json(data);
    }))
});

// Consultar todos los registro de producto_pedido
router.get('/producto_pedido_all', [], (req, res) => {
    query.getAll(connection, "producto_pedido", (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo registro en producto_pedido
router.post('/producto_pedido_new', [
    body('Producto_idProducto').not().isEmpty().isString(),
    body('Pedido_idPedido').not().isEmpty().isString(),
    body('cantidadPedido').not().isEmpty().isString()
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
    query.new(connection, "producto_pedido", body, (data => {
        res.json(data);
    }))
});

module.exports = router;