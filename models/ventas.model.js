const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getVentas = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT ventas.*, usuarios.nombre as usuario_nombre, clientes.nombre as cliente_nombre FROM ventas INNER JOIN usuarios ON ventas.usuario_id = usuarios.id INNER JOIN clientes ON ventas.cliente_id = clientes.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener ventas:', err);
    throw err;
  }
};

const crearVenta = async (venta) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO ventas (usuario_id, cliente_id, total, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [venta.usuario_id, venta.cliente_id, venta.total, venta.estado]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear venta:', err);
    throw err;
  }
};

const getVentaById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT ventas.*, usuarios.nombre as usuario_nombre, clientes.nombre as cliente_nombre FROM ventas INNER JOIN usuarios ON ventas.usuario_id = usuarios.id INNER JOIN clientes ON ventas.cliente_id = clientes.id WHERE ventas.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener venta por ID:', err);
    throw err;
  }
};

const actualizarVenta = async (id, venta) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE ventas SET usuario_id = $1, cliente_id = $2, total = $3, estado = $4 WHERE id = $5 RETURNING *',
      [
        venta.usuario_id,
        venta.cliente_id,
        venta.total,
        venta.estado,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar venta:', err);
    throw err;
  }
};

const eliminarVenta = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM ventas WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar venta:', err);
    throw err;
  }
};

module.exports = {
  getVentas,
  crearVenta,
  getVentaById,
  actualizarVenta,
  eliminarVenta,
};