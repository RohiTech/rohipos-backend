const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Importar la configuración de la base de datos
const dbConfig = require('./config/db.config');

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Rutas para el backend
app.use('/api/roles', require('./routes/roles.routes'));
// app.use('/api/usuarios', require('./routes/usuarios.routes'));
//app.use('/api/sesiones', require('./routes/sesiones.routes'));
//app.use('/api/productos', require('./routes/productos.routes'));
//app.use('/api/clientes', require('./routes/clientes.routes'));
//app.use('/api/proveedores', require('./routes/proveedores.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/detalles_venta', require('./routes/detalles_venta.routes'));
app.use('/api/cierres_caja', require('./routes/cierres_caja.routes'));
// app.use('/api/movimientos_caja', require('./routes/movimientos_caja.routes'));

// Conexión a la base de datos
const pool = dbConfig.pool;

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit();
  }
  console.log('Conexión a la base de datos exitosa!');
  console.log('Fecha y hora actual:', result.rows[0].now);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});