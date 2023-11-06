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
    body('idDoctor').not().isEmpty().isString(),
    body('dnombre').not().isEmpty().isString(),
    body('dedad').not().isEmpty().isString(),
    body('dtelefono').not().isEmpty().isString(),
    body('ddireccion').not().isEmpty().isString(),
    body('dturno').not().isEmpty().isString()
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

module.exports = router;