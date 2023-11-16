const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla producto
router.get('/producto_description', [], (req, res) => {
    query.describe(connection, "producto", (data => {
        res.json(data);
    }))
});

// Consultar todos los productos
router.get('/producto_all', [], (req, res) => {
    query.getAll(connection, "producto", (data => {
        res.json(data); 
    }))
});

// Consultar un producto por su id (PK)
router.get('/producto/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "producto", "idProducto", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo producto
router.post('/producto_new', [
    body('NombreProducto').not().isEmpty().isString(),
    body('MarcaProducto').not().isEmpty().isString(),
    body('CostoProducto').not().isEmpty(),
    body('ExistenciaProducto').not().isEmpty()
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
    query.new(connection, "producto", body, (data => {
        res.json(data);
    }))
});

// update de un producto
router.put('/producto_edit', [
    body('IdProducto').not().isEmpty(),
    body('NombreProducto').not().isEmpty().isString(),
    body('MarcaProducto').not().isEmpty().isString(),
    body('CostoProducto').not().isEmpty(),
    body('ExistenciaProducto').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.IdProducto;
    let values = {
        NombreProducto: req.body.NombreProducto,
        MarcaProducto: req.body.MarcaProducto,
        CostoProducto: req.body.CostoProducto,
        ExistenciaProducto: req.body.ExistenciaProducto
    }
    query.edit(connection, "producto", "IdProducto", id, values, (data => {
        res.json(data);
    }))
});

// Ruta para eliminar un producto por su ID (PK)
router.delete('/producto/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "producto", "IdProducto", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Producto eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el producto'
            });
        }
    }));
});

module.exports = router;