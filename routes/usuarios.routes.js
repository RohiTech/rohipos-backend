const express = require('express');
const router = express.Router();
const usuariosController = require('../models/usuarios.model'); // Importar el controlador

// Obtener todos los usuarios
router.get('/', usuariosController.getUsuarios);

// Crear un nuevo usuario
router.post('/', usuariosController.crearUsuario);

// Obtener un usuario por ID
router.get('/:id', usuariosController.getUsuarioById);

// Actualizar un usuario por ID
router.put('/:id', usuariosController.actualizarUsuario);

// Eliminar un usuario por ID
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;