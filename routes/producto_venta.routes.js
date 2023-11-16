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
    body('Producto_IdProducto').not().isEmpty(),
    body('Venta_IdVenta').not().isEmpty(),
    body('ProductoVentaCantidad').not().isEmpty()
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

// Ruta para eliminar un venta por su ID (PK)
router.delete('/producto_venta/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "producto_venta", "Producto_idProducto", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Producto_venta eliminada con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar Producto_venta'
            });
        }
    }));
});

module.exports = router;