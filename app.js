const express = require('express');
require('./config/db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Claro funcionando');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});

const usuariosRoutes = require('./routes/usuarios.routes');
const estacionesRoutes = require('./routes/estaciones.routes');
const solicitudesRoutes = require('./routes/solicitudes.routes');
const accesosRoutes = require('./routes/accesos.routes');

app.use('/usuarios', usuariosRoutes);
app.use('/estaciones', estacionesRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/accesos', accesosRoutes);