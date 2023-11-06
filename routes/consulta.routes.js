const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla consulta
router.get('/consulta_description', [], (req, res) => {
    query.describe(connection, "consultar", (data => {
        res.json(data);
    }))
});

// Consultar todos las consultas
router.get('/consulta_all', [], (req, res) => {
    query.getAll(connection, "consultar", (data => {
        res.json(data); 
    }))
});

// Consultar una consulta por su id (PK)
router.get('/consulta/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "consultar", "idConsulta", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nueva consulta
router.post('/consulta_new', [
    body('Cliente_idCliente').not().isEmpty().isString(),
    body('Doctor_idDoctor').not().isEmpty().isString(),
    body('precioc').not().isEmpty().isString(),
    body('fechac').not().isEmpty().isString(),
    body('idConsulta').not().isEmpty().isString()
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
    query.new(connection, "consultar", body, (data => {
        res.json(data);
    }))
});

module.exports = router;