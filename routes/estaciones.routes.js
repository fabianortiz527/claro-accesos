const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREAR ESTACIÓN
router.post('/', (req, res) => {
    const { nombre, ubicacion } = req.body;

    const sql = 'INSERT INTO estaciones (nombre, ubicacion) VALUES (?, ?)';
    db.query(sql, [nombre, ubicacion], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Estación creada' });
    });
});

// LISTAR ESTACIONES
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM estaciones';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

module.exports = router;