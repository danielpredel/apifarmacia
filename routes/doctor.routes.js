const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla doctor
router.get('/doctor_description', [], (req, res) => {
    query.describe(connection, "doctor", (data => {
        res.json(data);
    }))
});

// Consultar todos los doctor
router.get('/doctor_all', [], (req, res) => {
    query.getAll(connection, "doctor", (data => {
        res.json(data); 
    }))
});

// Consultar un doctor por su id (PK)
router.get('/doctor/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "doctor", "idDoctor", id, (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo doctor
router.post('/doctor_new', [
    body('NombreDoctor').not().isEmpty().isString(),
    body('EdadDoctor').not().isEmpty(),
    body('TelefonoDoctor').not().isEmpty().isString(),
    body('DireccionDoctor').not().isEmpty().isString(),
    body('TurnoDoctor').not().isEmpty().isString(),
    body('SueldoDoctor').not().isEmpty(),
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
    query.new(connection, "doctor", body, (data => {
        res.json(data);
    }))
});

// update de un doctor
router.put('/doctor_edit', [
    body('IdDoctor').not().isEmpty(),
    body('NombreDoctor').not().isEmpty().isString(),
    body('EdadDoctor').not().isEmpty(),
    body('TelefonoDoctor').not().isEmpty().isString(),
    body('DireccionDoctor').not().isEmpty().isString(),
    body('TurnoDoctor').not().isEmpty().isString(),
    body('SueldoDoctor').not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.IdDoctor;
    let values = {
        NombreDoctor: req.body.NombreDoctor,
        EdadDoctor: req.body.EdadDoctor,
        TelefonoDoctor: req.body.TelefonoDoctor,
        DireccionDoctor: req.body.DireccionDoctor,
        TurnoDoctor: req.body.TurnoDoctor,
        SueldoDoctor: req.body.SueldoDoctor,
    }
    query.edit(connection, "doctor", "IdDoctor", id, values, (data => {
        res.json(data);
    }))
});

// Ruta para eliminar un doctor por su ID (PK)
router.delete('/doctor/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "doctor", "IdDoctor", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Doctor eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el doctor'
            });
        }
    }));
});


module.exports = router;