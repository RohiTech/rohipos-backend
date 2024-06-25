const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getClientes = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM clientes');
    return rows;
  } catch (err) {
    console.error('Error al obtener clientes:', err);
    throw err;
  }
};

const crearCliente = async (cliente) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO clientes (nombre, apellido, dni, direccion, telefono, email, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        cliente.nombre,
        cliente.apellido,
        cliente.dni,
        cliente.direccion,
        cliente.telefono,
        cliente.email,
        cliente.estado
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear cliente:', err);
    throw err;
  }
};

const getClienteById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al obtener cliente por ID:', err);
    throw err;
  }
};

const actualizarCliente = async (id, cliente) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE clientes SET nombre = $1, apellido = $2, dni = $3, direccion = $4, telefono = $5, email = $6, estado = $7 WHERE id = $8 RETURNING *',
      [
        cliente.nombre,
        cliente.apellido,
        cliente.dni,
        cliente.direccion,
        cliente.telefono,
        cliente.email,
        cliente.estado,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar cliente:', err);
    throw err;
  }
};

const eliminarCliente = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM clientes WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar cliente:', err);
    throw err;
  }
};

module.exports = {
  getClientes,
  crearCliente,
  getClienteById,
  actualizarCliente,
  eliminarCliente,
};