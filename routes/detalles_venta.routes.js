const express = require('express');
const router = express.Router();
const DetalleVenta = require('../models/detalles_venta.model');

// Obtener todos los detalles de venta
router.get('/', async (req, res) => {
  try {
    const detallesVenta = await DetalleVenta.find()
      .populate('venta_id')
      .populate('producto_id')
      .exec();
    res.json(detallesVenta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo detalle de venta
router.post('/', async (req, res) => {
  try {
    const { venta_id, producto_id, cantidad, precio_unitario, descuento } =
      req.body;
    if (
      !venta_id ||
      !producto_id ||
      !cantidad ||
      !precio_unitario ||
      !descuento
    ) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son requeridos' });
    }
    const newDetalleVenta = new DetalleVenta({
      venta_id,
      producto_id,
      cantidad,
      precio_unitario,
      descuento
    });
    const savedDetalleVenta = await newDetalleVenta.save();
    res.status(201).json(savedDetalleVenta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un detalle de venta por ID
router.get('/:id', async (req, res) => {
  try {
    const detalleVenta = await DetalleVenta.findById(req.params.id)
      .populate('venta_id')
      .populate('producto_id')
      .exec();
    if (!detalleVenta) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    }
    res.json(detalleVenta);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un detalle de venta por ID
router.put('/:id', async (req, res) => {
  try {
    const { cantidad, precio_unitario, descuento } = req.body;
    const updatedDetalleVenta = await DetalleVenta.findByIdAndUpdate(
      req.params.id,
      { cantidad, precio_unitario, descuento },
      { new: true }
    );
    if (!updatedDetalleVenta) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    }
    res.json(updatedDetalleVenta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un detalle de venta por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDetalleVenta = await DetalleVenta.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDetalleVenta) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado' });
    }
    res.json({ message: 'Detalle de venta eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
