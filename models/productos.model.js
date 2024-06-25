const dbConfig = require('../config/db.config'); // Importar la configuración de la base de datos

const getProductos = async () => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT productos.*, categorias.nombre as categoria_nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id'
    );
    return rows;
  } catch (err) {
    console.error('Error al obtener productos:', err);
    throw err;
  }
};

const crearProducto = async (producto) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'INSERT INTO productos (codigo, nombre, descripcion, precio_compra, precio_venta, stock, categoria_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        producto.codigo,
        producto.nombre,
        producto.descripcion,
        producto.precio_compra,
        producto.precio_venta,
        producto.stock,
        producto.categoria_id,
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al crear producto:', err);
    throw err;
  }
};

const getProductoById = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'SELECT productos.*, categorias.nombre as categoria_nombre FROM productos INNER JOIN categorias ON productos.categoria_id = categorias.id WHERE productos.id = $1',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al obtener producto por ID:', err);
    throw err;
  }
};

const actualizarProducto = async (id, producto) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query(
      'UPDATE productos SET codigo = $1, nombre = $2, descripcion = $3, precio_compra = $4, precio_venta = $5, stock = $6, categoria_id = $7 WHERE id = $8 RETURNING *',
      [
        producto.codigo,
        producto.nombre,
        producto.descripcion,
        producto.precio_compra,
        producto.precio_venta,
        producto.stock,
        producto.categoria_id,
        id
      ]
    );
    return rows[0];
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    throw err;
  }
};

const eliminarProducto = async (id) => {
  const pool = dbConfig.pool;
  try {
    const { rows } = await pool.query('DELETE FROM productos WHERE id = $1', [
      id
    ]);
    return rows[0];
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    throw err;
  }
};

module.exports = {
  getProductos,
  crearProducto,
  getProductoById,
  actualizarProducto,
  eliminarProducto,
};