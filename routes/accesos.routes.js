const express = require('express');
const router = express.Router();
const db = require('../config/db');

// REGISTRAR ACCESO (solo si está aprobado)
router.post('/', (req, res) => {
    const { usuario_id, estacion_id } = req.body;

    // Verificar si existe solicitud aprobada
    const verificar = `
        SELECT * FROM solicitudes 
        WHERE usuario_id = ? AND estacion_id = ? AND estado = 'aprobado'
    `;

    db.query(verificar, [usuario_id, estacion_id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(400).json({ mensaje: 'No tiene solicitud aprobada' });
        }

        const insertar = `
            INSERT INTO accesos (usuario_id, estacion_id, fecha)
            VALUES (?, ?, NOW())
        `;

        db.query(insertar, [usuario_id, estacion_id], (err2, result2) => {
            if (err2) return res.status(500).json(err2);

            res.json({ mensaje: 'Acceso registrado' });
        });
    });
});

// LISTAR ACCESOS
router.get('/', (req, res) => {
    const sql = `
        SELECT a.id, u.nombre AS usuario, e.nombre AS estacion, a.fecha
        FROM accesos a
        JOIN usuarios u ON a.usuario_id = u.id
        JOIN estaciones e ON a.estacion_id = e.id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    });
});

module.exports = router;