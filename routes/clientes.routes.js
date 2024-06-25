const express = require('express');
const router = express.Router();
const clientesModel = require('../models/clientes.model'); // Importar el modelo de clientes
// const upload = require('../middleware/upload'); // No se necesita el middleware de carga

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await clientesModel.getClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, apellido, dni, direccion, telefono, email } =
      req.body;

    // Crea un nuevo cliente sin la foto
    const nuevoCliente = await clientesModel.crearCliente({
      nombre,
      apellido,
      dni,
      direccion,
      telefono,
      email,
    });

    res.status(201).json(nuevoCliente);
  } catch (err) {
    if (err.code === '23505') { // Código de error para violación de restricción única
      res.status(400).json({ message: 'El DNI del cliente ya existe' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await clientesModel.getClienteById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un cliente por ID
router.put('/:id', async (req, res) => {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const { nombre, apellido, dni, direccion, telefono, email, estado } =
      req.body;

    // Actualiza el cliente con los datos del cuerpo 
    const clienteActualizado = await clientesModel.actualizarCliente(
      req.params.id,
      {
        nombre,
        apellido,
        dni,
        direccion,
        telefono,
        email,
        estado,
        // foto: foto, // No se incluye en la actualización
      }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(clienteActualizado);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ message: 'El DNI del cliente ya existe' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

// Eliminar un cliente por ID
router.delete('/:id', async (req, res) => {
  try {
    const clienteEliminado = await clientesModel.eliminarCliente(
      req.params.id
    );
    if (!clienteEliminado) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;