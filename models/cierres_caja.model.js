const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getCierresCaja = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT cierres_caja.*, usuarios.nombre as usuario_nombre FROM cierres_caja INNER JOIN usuarios ON cierres_caja.usuario_id = usuarios.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener cierres de caja:', err);
    throw err;
  }
};

const crearCierreCaja = async (cierreCaja) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO cierres_caja (usuario_id, monto_inicial, monto_final) VALUES ($1, $2, $3) RETURNING *',
      [
        cierreCaja.usuario_id,
        cierreCaja.monto_inicial,
        cierreCaja.monto_final
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear cierre de caja:', err);
    throw err;
  }
};

const getCierreCajaById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT cierres_caja.*, usuarios.nombre as usuario_nombre FROM cierres_caja INNER JOIN usuarios ON cierres_caja.usuario_id = usuarios.id WHERE cierres_caja.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener cierre de caja por ID:', err);
    throw err;
  }
};

const actualizarCierreCaja = async (id, cierreCaja) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE cierres_caja SET usuario_id = $1, monto_inicial = $2, monto_final = $3 WHERE id = $4 RETURNING *',
      [
        cierreCaja.usuario_id,
        cierreCaja.monto_inicial,
        cierreCaja.monto_final,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar cierre de caja:', err);
    throw err;
  }
};

const eliminarCierreCaja = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'DELETE FROM cierres_caja WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar cierre de caja:', err);
    throw err;
  }
};

module.exports = {
  getCierresCaja,
  crearCierreCaja,
  getCierreCajaById,
  actualizarCierreCaja,
  eliminarCierreCaja,
};