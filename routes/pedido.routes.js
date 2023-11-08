const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla pedido
router.get('/pedido_description', [], (req, res) => {
    query.describe(connection, "pedido", (data => {
        res.json(data);
    }))
});

// Consultar todos los pedido
router.get('/pedido_all', [], (req, res) => {
    query.getAll(connection, "pedido", (data => {
        res.json(data); 
    }))
});

// Consultar un pedido por su id (PK)
router.get('/pedido/:id', (req, res) => {
    const id = req.params.id;
    query.getRow(connection, "pedido", "idPedido", id, (data => {
        res.json(data); 
    }))
});

// Las dos siguientes no sirve ninguna

// insersion de un nuevo pedido
router.post('/pedido_new', [
    body('totalpedido').not().isEmpty().isString(),
    body('fechas').not().isEmpty().isString(),
    body('idPedido').not().isEmpty().isString(),
    body('Proveedor_idProveedor').not().isEmpty().isString(),
    body('status').not().isEmpty().isString()
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
    query.new(connection, "pedido", body, (data => {
        res.json(data);
    }))
});

// update de un pedido
router.put('/pedido_edit', [
    body('totalpedido').not().isEmpty(),
    body('fechas').not().isEmpty().isString(),
    body('idPedido').not().isEmpty(),
    body('Proveedor_idProveedor').not().isEmpty(),
    body('status').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.idPedido;
    let values = {
        totalpedido: req.body.totalpedido,
        fechas: req.body.fechas,
        idPedido: id,
        Proveedor_idProveedor: req.body.Proveedor_idProveedor,
        status: req.body.status
    }
    console.log(values)
    query.edit(connection, "pedido", "idPedido", id, values, (data => {
        res.json(data);
    }))
});

// Ruta para eliminar un pedido por su ID (PK)
router.delete('/pedido/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "pedido", "idPedido", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Pedido eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el pedido'
            });
        }
    }));
});
module.exports = router;