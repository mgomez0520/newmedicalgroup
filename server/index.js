const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta raíz del proyecto
app.use(express.static(path.join(__dirname, '..')));

// Endpoint de prueba para el formulario
app.post('/api/contact', (req, res) => {
  console.log('Contacto recibido:', req.body);
  // Aquí podrías integrar un servicio real (email, CRM, etc.)
  res.json({ ok: true, message: 'Recibido en servidor de desarrollo' });
});

app.listen(PORT, () => {
  console.log(`Servidor de desarrollo escuchando en http://localhost:${PORT}`);
});
