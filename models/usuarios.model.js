const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getUsuarios = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT usuarios.*, roles.nombre as rol_nombre FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    throw err;
  }
};

const crearUsuario = async (usuario) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (username, password, nombre, apellido, rol_id, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        usuario.username,
        usuario.password,
        usuario.nombre,
        usuario.apellido,
        usuario.rol_id,
        usuario.estado
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear usuario:', err);
    throw err;
  }
};

const getUsuarioById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT usuarios.*, roles.nombre as rol_nombre FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id WHERE usuarios.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener usuario por ID:', err);
    throw err;
  }
};

const actualizarUsuario = async (id, usuario) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE usuarios SET username = $1, password = $2, nombre = $3, apellido = $4, rol_id = $5, estado = $6 WHERE id = $7 RETURNING *',
      [
        usuario.username,
        usuario.password,
        usuario.nombre,
        usuario.apellido,
        usuario.rol_id,
        usuario.estado,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    throw err;
  }
};

const eliminarUsuario = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM usuarios WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    throw err;
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
};