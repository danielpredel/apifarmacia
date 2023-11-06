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
    body('idProducto').not().isEmpty(),
    body('pnombre').not().isEmpty().isString(),
    body('pmarca').not().isEmpty().isString(),
    body('pcosto').not().isEmpty(),
    body('pexitencia').not().isEmpty()
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

module.exports = router;