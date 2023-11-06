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
    body('idEmpleado').not().isEmpty().isString(),
    body('Enombre').not().isEmpty().isString(),
    body('Etelefono').not().isEmpty().isString(),
    body('Edireccion').not().isEmpty().isString(),
    body('Eedad').not().isEmpty().isString(),
    body('suedo').not().isEmpty().isString()
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

// Ruta para eliminar un empleado por su ID (PK)
router.delete('/empleado/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "empleado", "idEmpleado", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Empleado eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el empleado'
            });
        }
    }));
});

module.exports = router;