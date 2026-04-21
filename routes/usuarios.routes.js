const express = require('express');
const router = express.Router();
const db = require('../config/db');

// REGISTRAR USUARIO
router.post('/registro', (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    const sql = 'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, password, rol], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ mensaje: 'Usuario registrado' });
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { correo, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE correo = ? AND password = ?';
    db.query(sql, [correo, password], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            res.json({ mensaje: 'Login exitoso', usuario: result[0] });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    });
});

module.exports = router;