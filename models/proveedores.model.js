const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getProveedores = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM proveedores');
    return rows;
  } catch (err) {
    console.error('Error al obtener proveedores:', err);
    throw err;
  }
};

const crearProveedor = async (proveedor) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO proveedores (nombre, contacto, telefono, direccion, email, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        proveedor.nombre,
        proveedor.contacto,
        proveedor.telefono,
        proveedor.direccion,
        proveedor.email,
        proveedor.estado
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear proveedor:', err);
    throw err;
  }
};

const getProveedorById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM proveedores WHERE id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener proveedor por ID:', err);
    throw err;
  }
};

const actualizarProveedor = async (id, proveedor) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE proveedores SET nombre = $1, contacto = $2, telefono = $3, direccion = $4, email = $5, estado = $6 WHERE id = $7 RETURNING *',
      [
        proveedor.nombre,
        proveedor.contacto,
        proveedor.telefono,
        proveedor.direccion,
        proveedor.email,
        proveedor.estado,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar proveedor:', err);
    throw err;
  }
};

const eliminarProveedor = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM proveedores WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar proveedor:', err);
    throw err;
  }
};

module.exports = {
  getProveedores,
  crearProveedor,
  getProveedorById,
  actualizarProveedor,
  eliminarProveedor,
};