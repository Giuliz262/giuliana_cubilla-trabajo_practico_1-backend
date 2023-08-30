// TODO: Importar controladores de Eventos, luego vincular rutas con controladores

const { Router } = require('express');

const evento = require('../models/Evento')

const router = Router();

const {
    obtenerEventos, obtenerEvento, actualizarEventos, crearEventos, eliminarEventos
} = require('../controllers/evento.controllers');


// ==========================================
//         Rutas para CRUD de Eventos
// ==========================================

// Obtener todos los Eventos
router.get('/api/evento', obtenerEventos);

router.post('/api/evento', crearEventos);

router.get('/api/evento/:id', obtenerEvento);

router.put('/api/evento/:id', actualizarEventos);

router.delete('/api/evento/:id', eliminarEventos)


module.exports = router;