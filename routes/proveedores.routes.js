const express = require('express');
const router = express.Router();
const proveedoresModel = require('../models/proveedores.model'); // Importar el modelo de proveedores
// const upload = require('../middleware/upload'); // No se necesita el middleware de carga

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await proveedoresModel.getProveedores();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo proveedor
router.post('/', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, contacto, telefono, direccion, email } =
      req.body;

    // Crea un nuevo proveedor sin la foto
    const nuevoProveedor = await proveedoresModel.crearProveedor({
      nombre,
      contacto,
      telefono,
      direccion,
      email,
    });

    res.status(201).json(nuevoProveedor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un proveedor por ID
router.get('/:id', async (req, res) => {
  try {
    const proveedor = await proveedoresModel.getProveedorById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un proveedor por ID
router.put('/:id', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, contacto, telefono, direccion, email, estado } =
      req.body;

    // Actualiza el proveedor con los datos del cuerpo 
    const proveedorActualizado = await proveedoresModel.actualizarProveedor(
      req.params.id,
      {
        nombre,
        contacto,
        telefono,
        direccion,
        email,
        estado,
        // foto: foto, // No se incluye en la actualización
      }
    );

    if (!proveedorActualizado) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json(proveedorActualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un proveedor por ID
router.delete('/:id', async (req, res) => {
  try {
    const proveedorEliminado = await proveedoresModel.eliminarProveedor(
      req.params.id
    );
    if (!proveedorEliminado) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;