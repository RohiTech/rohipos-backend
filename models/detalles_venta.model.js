const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getDetallesVenta = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT detalles_venta.*, ventas.fecha as venta_fecha, productos.nombre as producto_nombre FROM detalles_venta INNER JOIN ventas ON detalles_venta.venta_id = ventas.id INNER JOIN productos ON detalles_venta.producto_id = productos.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener detalles de venta:', err);
    throw err;
  }
};

const crearDetalleVenta = async (detalleVenta) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO detalles_venta (venta_id, producto_id, cantidad, precio_unitario, descuento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        detalleVenta.venta_id,
        detalleVenta.producto_id,
        detalleVenta.cantidad,
        detalleVenta.precio_unitario,
        detalleVenta.descuento
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear detalle de venta:', err);
    throw err;
  }
};

const getDetalleVentaById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT detalles_venta.*, ventas.fecha as venta_fecha, productos.nombre as producto_nombre FROM detalles_venta INNER JOIN ventas ON detalles_venta.venta_id = ventas.id INNER JOIN productos ON detalles_venta.producto_id = productos.id WHERE detalles_venta.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener detalle de venta por ID:', err);
    throw err;
  }
};

const actualizarDetalleVenta = async (id, detalleVenta) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE detalles_venta SET venta_id = $1, producto_id = $2, cantidad = $3, precio_unitario = $4, descuento = $5 WHERE id = $6 RETURNING *',
      [
        detalleVenta.venta_id,
        detalleVenta.producto_id,
        detalleVenta.cantidad,
        detalleVenta.precio_unitario,
        detalleVenta.descuento,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar detalle de venta:', err);
    throw err;
  }
};

const eliminarDetalleVenta = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'DELETE FROM detalles_venta WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar detalle de venta:', err);
    throw err;
  }
};

module.exports = {
  getDetallesVenta,
  crearDetalleVenta,
  getDetalleVentaById,
  actualizarDetalleVenta,
  eliminarDetalleVenta,
};