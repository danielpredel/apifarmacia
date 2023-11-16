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
    body('Cliente_idCliente').not().isEmpty(),
    body('Doctor_idDoctor').not().isEmpty(),
    body('precioc').not().isEmpty(),
    body('fechac').not().isEmpty().isString(),
    body('idConsulta').not().isEmpty()
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

// update de una consulta
router.put('/consulta_edit', [
    body('IdConsulta').not().isEmpty(),
    body('Cliente_IdCliente').not().isEmpty(),
    body('Doctor_IdDoctor').not().isEmpty(),
    body('ConsultarPrecio').not().isEmpty(),
    body('ConsultarFecha').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.IdConsulta;
    let values = {
        Cliente_IdCliente: req.body.Cliente_IdCliente,
        Doctor_IdDoctor: req.body.Doctor_IdDoctor,
        ConsultarPrecio: req.body.ConsultarPrecio,
        ConsultarFecha: req.body.ConsultarFecha
    }
    query.edit(connection, "consultar", "IdConsulta", id, values, (data => {
        res.json(data);
    }))
})


// Ruta para eliminar una consulta por su ID (PK)
router.delete('/consulta/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "consultar", "idConsulta", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Consulta eliminada con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar la consulta'
            });
        }
    }));
});

module.exports = router;