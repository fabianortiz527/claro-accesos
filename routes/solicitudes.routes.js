const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREAR SOLICITUD
router.post('/', (req, res) => {
    const { usuario_id, estacion_id } = req.body;

    const sql = `
        INSERT INTO solicitudes (usuario_id, estacion_id, estado, fecha)
        VALUES (?, ?, 'pendiente', NOW())
    `;

    db.query(sql, [usuario_id, estacion_id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Solicitud creada' });
    });
});

// LISTAR SOLICITUDES
router.get('/', (req, res) => {
    const sql = `
        SELECT s.id, u.nombre AS usuario, e.nombre AS estacion, s.estado, s.fecha
        FROM solicitudes s
        JOIN usuarios u ON s.usuario_id = u.id
        JOIN estaciones e ON s.estacion_id = e.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

// APROBAR / RECHAZAR
router.put('/:id', (req, res) => {
    const { estado } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE solicitudes SET estado = ? WHERE id = ?';

    db.query(sql, [estado, id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Solicitud actualizada' });
    });
});

module.exports = router;