const express = require('express')
const query = require('../query.model')
const connection = require("../conexion")

const {
    body,
    param,
    validationResult
} = require('express-validator');
var router = express.Router()


// Consultar 1
router.get('/reportegene', (req, res) => {
    const id = req.params.id;
    console.log("hola :)")
    query.consulta1(connection,(data => {
        res.json(data); 
    }))
});
//vista2
router.get('/reportegenev2', (req, res) => {
    const id = req.params.id;
    console.log("hola :)")
    query.vista2(connection,(data => {
        res.json(data); 
    }))
});
//mostrar vista1
router.get('/reportegenem', [], (req, res) => {
    query.getRowsp(connection, (data => {
        res.json(data); 
    }))
});
router.get('/sumvi1', [], (req, res) => {
    query.sumav1(connection, (data => {
        res.json(data); 
    }))
});
router.get('/sumvi1l', [], (req, res) => {
    query.getRowspv2(connection, (data => {
        res.json(data); 
    }))
});
router.get('/sumvi3', [], (req, res) => {
    query.vista3(connection, (data => {
        res.json(data); 
    }))
});
router.get('/sumvi3l', [], (req, res) => {
    query.getRowspv3(connection, (data => {
        res.json(data); 
    }))
});
//Roll
router.get('/Roll', [], (req, res) => {
    query.Roll(connection, (data => {
        res.json(data); 
    }))
});
///
router.get('/pro1', (req, res) => {
    const id = req.params.id;
    query.pro(connection,(data => {
        res.json(data); 
    }))
});

/*
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

// Ruta para eliminar un cliente por su ID (PK)
router.delete('/cliente/:id', (req, res) => {
    const id = req.params.id;
    query.delete(connection, "cliente", "IdCliente", id, (data => {
        if (data.success) {
            res.json({
                success: true,
                message: 'Cliente eliminado con éxito'
            });
        } else {
            res.json({
                success: false,
                err: 'Error al eliminar el cliente'
            });
        }
    }));
});
// insersion de un nuevo cliente
router.post('/cliente_new', [
    body('NombreCliente').not().isEmpty().isString(),
    body('EdadCliente').not().isEmpty(),
    body('TelefonoCliente').not().isEmpty().isString(),
    body('DireccionCliente').not().isEmpty().isString()
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

// update de un cliente
router.put('/cliente_edit', [
    body('IdCliente').not().isEmpty(),
    body('NombreCliente').not().isEmpty().isString(),
    body('EdadCliente').not().isEmpty(),
    body('TelefonoCliente').not().isEmpty().isString(),
    body('DireccionCliente').not().isEmpty().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            success: false,
            err: JSON.stringify(errors)
        })
        return
    }
    let id = req.body.IdCliente;
    let values = {
        NombreCliente: req.body.NombreCliente,
        EdadCliente: req.body.EdadCliente,
        TelefonoCliente: req.body.TelefonoCliente,
        DireccionCliente: req.body.DireccionCliente
    }
    query.edit(connection, "cliente", "IdCliente", id, values, (data => {
        res.json(data);
    }))
});*/

module.exports = router;