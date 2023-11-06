const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla cliente
router.get('/cliente_description', [], (req, res) => {
    query.describe(connection, "cliente", (data => {
        res.json(data);
    }))
});

// Consultar todos los clientes
router.get('/cliente_all', [], (req, res) => {
    query.getAll(connection, "cliente", (data => {
        res.json(data); 
    }))
});

// Consultar un cliente por su id (PK)
router.get('/cliente/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "cliente", "idCliente", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo cliente
router.post('/cliente_new', [
    body('idCliente').not().isEmpty().isString(),
    body('cnombre').not().isEmpty().isString(),
    body('cedad').not().isEmpty().isString(),
    body('ctelefono').not().isEmpty().isString(),
    body('cdireccion').not().isEmpty().isString()
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
    query.new(connection, "cliente", body, (data => {
        res.json(data);
    }))
});

module.exports = router;