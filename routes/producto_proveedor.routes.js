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

// Ruta para eliminar un venta por su ID (PK)
router.delete('/producto_proveedor/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "producto_proveedor", "Producto_idProducto", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'producto_proveedor eliminada con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar la producto_proveedor'
            });
        }
    }));
});

module.exports = router;