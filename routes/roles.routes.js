const express = require('express');
const router = express.Router();
const Role = require('../models/roles.model');

// Obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.getRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo rol
router.post('/', async (req, res) => {
  try {
    const newRole = new Role(req.body);
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un rol por ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un rol por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un rol por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json({ message: 'Rol eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
