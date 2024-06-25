const express = require('express');
const router = express.Router();
const Categoria = require('../models/categorias.model');

// Obtener todas las categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva categoria
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    const newCategoria = new Categoria({ nombre, descripcion });
    const savedCategoria = await newCategoria.save();
    res.status(201).json(savedCategoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener una categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una categoria por ID
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const updatedCategoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion },
      { new: true }
    );
    if (!updatedCategoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(updatedCategoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una categoria por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!deletedCategoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
