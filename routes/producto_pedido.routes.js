const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Describir tabla producto_pedido
router.get('/producto_pedido_description', [], (req, res) => {
    query.describe(connection, "producto_pedido", (data => {
        res.json(data);
    }))
});

// Consultar todos los registro de producto_pedido
router.get('/producto_pedido_all', [], (req, res) => {
    query.getAll(connection, "producto_pedido", (data => {
        res.json(data); 
    }))
});

// insersion de un nuevo registro en producto_pedido
router.post('/producto_pedido_new', [
    body('Producto_idProducto').not().isEmpty(),
    body('Pedido_idPedido').not().isEmpty(),
    body('cantidadPedido').not().isEmpty()
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
    query.new(connection, "producto_pedido", body, (data => {
        res.json(data);
    }))
});

// update de un producto_pedido
// router.put('/producto_pedido_edit', [
//     body('Producto_idProducto').not().isEmpty(),
//     body('Pedido_idPedido').not().isEmpty(),
//     body('cantidadPedido').not().isEmpty()
// ], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.json({
//             success: false,
//             err: JSON.stringify(errors)
//         })
//         return
//     }
//     let id = req.body.idCliente;
//     let values = {
//         idCliente:  id,
//         cnombre: req.body.cnombre,
//         cedad: req.body.cedad,
//     }
//     query.edit(connection, "cliente", "idCliente", id, values, (data => {
//         res.json(data);
//     }))
// });


// Ruta para eliminar un venta por su ID (PK)
router.delete('/producto_pedido/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "producto_pedido", "Producto_idPedido", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'producto_pedido eliminada con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar producto_pedido'
            });
        }
    }));
});

module.exports = router;