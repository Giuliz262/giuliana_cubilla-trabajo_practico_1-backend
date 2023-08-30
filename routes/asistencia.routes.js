// TODO: Importar controladores de Asistencias, luego vincular rutas con controladores

const { Router } = require('express');
const router = Router();

const {
    crearAsistencia, 
    obtenerAsistencias, 
    eliminarAsistencias, 
    obtenerAsistencia, 
    actualizarAsistencias
} = require('../controllers/asistencia');



// ==========================================
//         Rutas para CRUD de Asistencias
// ==========================================

// Obtener todas las Asistencias
router.get('/api/asistencia/', obtenerAsistencias);

router.post('/api/asistencia/', crearAsistencia);

router.get('/api/asistencia/:id', obtenerAsistencia);

router.put('/api/asistencia/:id', actualizarAsistencias);

router.delete('/api/asistencia/:id', eliminarAsistencias);




module.exports = router;