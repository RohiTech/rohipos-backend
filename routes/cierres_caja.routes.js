const express = require('express');
const router = express.Router();
const CierreCaja = require('../models/cierres_caja.model');
const MovimientoCaja = require('../models/movimientos_caja.model');

// Obtener todos los cierres de caja
router.get('/', async (req, res) => {
  try {
    const cierresCaja = await CierreCaja.find()
      .populate('usuario_id')
      .exec();
    res.json(cierresCaja);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo cierre de caja
router.post('/', async (req, res) => {
  try {
    const { usuario_id, monto_inicial, monto_final, movimientos } = req.body;
    if (!usuario_id || !monto_inicial || !monto_final || !movimientos) {
      return res
        .status(400)
        .json({ message: 'Todos los campos son requeridos' });
    }
    const newCierreCaja = new CierreCaja({
      usuario_id,
      monto_inicial,
      monto_final
    });
    const savedCierreCaja = await newCierreCaja.save();
    // Crear los movimientos de caja asociados
    for (const movimiento of movimientos) {
      const { tipo, descripcion, monto } = movimiento;
      const newMovimientoCaja = new MovimientoCaja({
        cierre_caja_id: savedCierreCaja._id,
        tipo,
        descripcion,
        monto
      });
      await newMovimientoCaja.save();
    }
    res.status(201).json(savedCierreCaja);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un cierre de caja por ID
router.get('/:id', async (req, res) => {
  try {
    const cierreCaja = await CierreCaja.findById(req.params.id)
      .populate('usuario_id')
      .exec();
    if (!cierreCaja) {
      return res.status(404).json({ message: 'Cierre de caja no encontrado' });
    }
    // Obtener los movimientos de caja asociados
    const movimientos = await MovimientoCaja.find({
      cierre_caja_id: req.params.id
    });
    res.json({ cierreCaja, movimientos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un cierre de caja por ID
router.put('/:id', async (req, res) => {
  try {
    const { monto_inicial, monto_final } = req.body;
    const updatedCierreCaja = await CierreCaja.findByIdAndUpdate(
      req.params.id,
      { monto_inicial, monto_final },
      { new: true }
    );
    if (!updatedCierreCaja) {
      return res.status(404).json({ message: 'Cierre de caja no encontrado' });
    }
    res.json(updatedCierreCaja);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un cierre de caja por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCierreCaja = await CierreCaja.findByIdAndDelete(req.params.id);
    if (!deletedCierreCaja) {
      return res.status(404).json({ message: 'Cierre de caja no encontrado' });
    }
    // Eliminar los movimientos de caja asociados
    await MovimientoCaja.deleteMany({ cierre_caja_id: req.params.id });
    res.json({ message: 'Cierre de caja eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;