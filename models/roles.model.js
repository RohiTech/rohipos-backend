const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getRoles = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM roles');
    return rows;
  } catch (err) {
    console.error('Error al obtener roles:', err);
    throw err;
  }
};

const crearRol = async (rol) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO roles (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [rol.nombre, rol.descripcion]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear rol:', err);
    throw err;
  }
};

const getRolById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM roles WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al obtener rol por ID:', err);
    throw err;
  }
};

const actualizarRol = async (id, rol) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE roles SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [rol.nombre, rol.descripcion, id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar rol:', err);
    throw err;
  }
};

const eliminarRol = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM roles WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar rol:', err);
    throw err;
  }
};

module.exports = {
  getRoles,
  crearRol,
  getRolById,
  actualizarRol,
  eliminarRol,
};