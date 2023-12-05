const express = require('express')
const bodyParser = require('body-parser')
const connection = require("./conexion")
const cors = require('cors')
const app = express()
app.use(cors())
// const misrutas = require('./routes/rutas')

// Rutas
const clientRoutes = require('./routes/cliente.routes')
const consultarRoutes = require('./routes/consulta.routes')
const doctorRoutes = require('./routes/doctor.routes')
const empleadoRoutes = require('./routes/empleado.routes')
const pedidoRoutes = require('./routes/pedido.routes')
const producto_pedidoRoutes = require('./routes/producto_pedido.routes')
const producto_proveedorRoutes = require('./routes/producto_proveedor.routes')
const producto_ventaRoutes = require('./routes/producto_venta.routes')
const productoRoutes = require('./routes/producto.routes')
const proveedorRoutes = require('./routes/proveedor.routes')
const ventaRoutes = require('./routes/venta.routes')
const consultasRoutes=require('./routes/consultas.routes')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
// app.use('/', misrutas)

// Agregar rutas a la aplicacion
app.use('/', clientRoutes)
app.use('/', consultarRoutes)
app.use('/', doctorRoutes)
app.use('/', empleadoRoutes)
app.use('/', pedidoRoutes)
app.use('/', producto_pedidoRoutes)
app.use('/', producto_proveedorRoutes)
app.use('/', producto_ventaRoutes)
app.use('/', productoRoutes)
app.use('/', proveedorRoutes)
app.use('/', ventaRoutes)
app.use('/', consultasRoutes)
connection.connect((err, res) => {
    if (err) {
        console.log(err)
        console.log('Error de conexion con sql')
        return
    }
    console.log('Conexion exitosa a la base de datos')
});

app.listen(3000, (err, res) => {
    if (err) {
        console.log('Error al levantar servidor')
        return
    }
    console.log('Apis escuchando en el puerto 3000')
})