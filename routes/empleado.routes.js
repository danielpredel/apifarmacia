const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla empleado
router.get('/empleado_description', [], (req, res) => {
    query.describe(connection, "empleado", (data => {
        res.json(data);
    }))
});

// Consultar todos los empleados
router.get('/empleado_all', [], (req, res) => {
    query.getAll(connection, "empleado", (data => {
        res.json(data); 
    }))
});

// Consultar un empleado por su id (PK)
router.get('/empleado/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "empleado", "idEmpleado", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo empleado
router.post('/empleado_new', [
    body('idEmpleado').not().isEmpty(),
    body('Enombre').not().isEmpty().isString(),
    body('Etelefono').not().isEmpty().isString(),
    body('Edireccion').not().isEmpty().isString(),
    body('Eedad').not().isEmpty().isString(),
    body('suedo').not().isEmpty()
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
    query.new(connection, "empleado", body, (data => {
        res.json(data);
    }))
});

// update de un empleado
router.put('/empleado_edit', [
    body('idEmpleado').not().isEmpty(),
    body('Enombre').not().isEmpty().isString(),
    body('Etelefono').not().isEmpty().isString(),
    body('Edireccion').not().isEmpty().isString(),
    body('Eedad').not().isEmpty().isString(),
    body('suedo').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.idEmpleado;
    let values = {
        idEmpleado:  id,
        Enombre: req.body.Enombre,
        Etelefono: req.body.Etelefono,
        Edireccion: req.body.Edireccion,
        Eedad: req.body.Eedad,
        suedo: req.body.suedo
    }
    query.edit(connection, "empleado", "idEmpleado", id, values, (data => {
        res.json(data);
    }))
});

module.exports = router;