const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getMovimientosCaja = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT movimientos_caja.*, cierres_caja.fecha as cierre_fecha FROM movimientos_caja INNER JOIN cierres_caja ON movimientos_caja.cierre_caja_id = cierres_caja.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener movimientos de caja:', err);
    throw err;
  }
};

const crearMovimientoCaja = async (movimientoCaja) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO movimientos_caja (cierre_caja_id, tipo, descripcion, monto) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        movimientoCaja.cierre_caja_id,
        movimientoCaja.tipo,
        movimientoCaja.descripcion,
        movimientoCaja.monto
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear movimiento de caja:', err);
    throw err;
  }
};

const getMovimientoCajaById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT movimientos_caja.*, cierres_caja.fecha as cierre_fecha FROM movimientos_caja INNER JOIN cierres_caja ON movimientos_caja.cierre_caja_id = cierres_caja.id WHERE movimientos_caja.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener movimiento de caja por ID:', err);
    throw err;
  }
};

const actualizarMovimientoCaja = async (id, movimientoCaja) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE movimientos_caja SET cierre_caja_id = $1, tipo = $2, descripcion = $3, monto = $4 WHERE id = $5 RETURNING *',
      [
        movimientoCaja.cierre_caja_id,
        movimientoCaja.tipo,
        movimientoCaja.descripcion,
        movimientoCaja.monto,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar movimiento de caja:', err);
    throw err;
  }
};

const eliminarMovimientoCaja = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'DELETE FROM movimientos_caja WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar movimiento de caja:', err);
    throw err;
  }
};

module.exports = {
  getMovimientosCaja,
  crearMovimientoCaja,
  getMovimientoCajaById,
  actualizarMovimientoCaja,
  eliminarMovimientoCaja,
};