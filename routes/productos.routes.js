const express = require('express');
const router = express.Router();
const productosModel = require('../models/productos.model'); // Importar el modelo de productos
const upload = require('../middleware/upload'); // Importar el middleware de carga

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await productosModel.getProductos();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo producto
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { codigo, nombre, descripcion, precio_compra, precio_venta, stock, categoria_id } =
      req.body;

    // Crea un nuevo producto sin la imagen
    const nuevoProducto = await productosModel.crearProducto({
      codigo,
      nombre,
      descripcion,
      precio_compra,
      precio_venta,
      stock,
      categoria_id,
    });

    res.status(201).json(nuevoProducto);
  } catch (err) {
    if (err.code === '23505') { // Código de error para violación de restricción única
      res.status(400).json({ message: 'El código del producto ya existe' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await productosModel.getProductoById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un producto por ID
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { codigo, nombre, descripcion, precio_compra, precio_venta, stock, categoria_id, estado } =
      req.body;

    // Obtén el buffer de la imagen del archivo subido (solo si se proporciona)
    const imagen = req.file ? req.file.buffer : null;

    // Actualiza el producto con los datos del cuerpo y la imagen (opcional)
    const productoActualizado = await productosModel.actualizarProducto(
      req.params.id,
      {
        codigo,
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock,
        categoria_id,
        estado,
        // imagen: imagen, // No se incluye en la actualización
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: 'El código del producto ya existe' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const productoEliminado = await productosModel.eliminarProducto(
      req.params.id
    );
    if (!productoEliminado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;