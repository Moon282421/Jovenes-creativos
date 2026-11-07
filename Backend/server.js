require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas en la nube
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas en la nube'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// 2. Esquema y Modelo de Datos (Estructura de la Reserva)
const reservaSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  fecha: String,
  tipoEvento: String,
  plan: String,
  mensaje: String,
  fechaRegistro: { type: Date, default: Date.now }
});

const Reserva = mongoose.model('Reserva', reservaSchema);

// 3. Ruta API para guardar una nueva reserva (POST)
app.post('/api/reservas', async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json({ mensaje: 'Reserva guardada en MongoDB' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la reserva' });
  }
});

// 4. Ruta API para ver todas las reservas en el Panel Admin (GET)
app.get('/api/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ fechaRegistro: -1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// Iniciar servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor Backend corriendo en http://localhost:3000');
});