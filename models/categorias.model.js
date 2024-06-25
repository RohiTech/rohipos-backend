const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getCategorias = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM categorias');
    return rows;
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    throw err;
  }
};

const crearCategoria = async (categoria) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [categoria.nombre, categoria.descripcion]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear categoría:', err);
    throw err;
  }
};

const getCategoriaById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM categorias WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener categoría por ID:', err);
    throw err;
  }
};

const actualizarCategoria = async (id, categoria) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [categoria.nombre, categoria.descripcion, id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    throw err;
  }
};

const eliminarCategoria = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'DELETE FROM categorias WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    throw err;
  }
};

module.exports = {
  getCategorias,
  crearCategoria,
  getCategoriaById,
  actualizarCategoria,
  eliminarCategoria,
};