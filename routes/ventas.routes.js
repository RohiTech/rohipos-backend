const express = require('express');
const router = express.Router();
const Venta = require('../models/ventas.model');
const DetalleVenta = require('../models/detalles_venta.model');

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('usuario_id')
      .populate('cliente_id')
      .exec();
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva venta
router.post('/', async (req, res) => {
  try {
    const { usuario_id, cliente_id, detalles, total } = req.body;
    if (!usuario_id || !cliente_id || !detalles || !total) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son requeridos' });
    }
    const newVenta = new Venta({ usuario_id, cliente_id, total });
    const savedVenta = await newVenta.save();
    // Crear los detalles de venta
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio_unitario, descuento } = detalle;
      const newDetalleVenta = new DetalleVenta({
        venta_id: savedVenta._id,
        producto_id,
        cantidad,
        precio_unitario,
        descuento
      });
      await newDetalleVenta.save();
    }
    res.status(201).json(savedVenta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener una venta por ID
router.get('/:id', async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate('usuario_id')
      .populate('cliente_id')
      .exec();
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    // Obtener los detalles de venta asociados
    const detalles = await DetalleVenta.find({ venta_id: req.params.id })
      .populate('producto_id')
      .exec();
    res.json({ venta, detalles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una venta por ID (cambiar estado)
router.put('/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    const updatedVenta = await Venta.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!updatedVenta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(updatedVenta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una venta por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVenta = await Venta.findByIdAndDelete(req.params.id);
    if (!deletedVenta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    // Eliminar los detalles de venta asociados
    await DetalleVenta.deleteMany({ venta_id: req.params.id });
    res.json({ message: 'Venta eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
