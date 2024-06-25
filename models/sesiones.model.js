const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const crearSesion = async (sesion) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO sesiones (usuario_id, token, fecha_inicio, fecha_fin, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        sesion.usuario_id,
        sesion.token,
        sesion.fecha_inicio,
        sesion.fecha_fin,
        sesion.estado
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear sesión:', err);
    throw err;
  }
};

const getSesionById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM sesiones WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al obtener sesión por ID:', err);
    throw err;
  }
};

const actualizarSesion = async (id, sesion) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE sesiones SET usuario_id = $1, token = $2, fecha_inicio = $3, fecha_fin = $4, estado = $5 WHERE id = $6 RETURNING *',
      [
        sesion.usuario_id,
        sesion.token,
        sesion.fecha_inicio,
        sesion.fecha_fin,
        sesion.estado,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar sesión:', err);
    throw err;
  }
};

const eliminarSesion = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM sesiones WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar sesión:', err);
    throw err;
  }
};

module.exports = {
  crearSesion,
  getSesionById,
  actualizarSesion,
  eliminarSesion,
};