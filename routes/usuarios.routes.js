// TODO: Importar controladores de Usuarios, luego vincular rutas con controladores

const { Router } = require('express');

const evento = require('../models/Usuario')

const router = Router();

const {
    crearUsuario, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios, obtenerUsuario
} = require('../controllers/usuario.controllers');

// ==========================================
//         Rutas para CRUD de Usuarios
// ==========================================

// Obtener todos los Usuarios
router.get('/api/usuario/', obtenerUsuarios);

router.post('/api/usuario/', crearUsuario);

router.get('/api/usuario/:id', obtenerUsuario);

router.put('/api/usuario/:id', actualizarUsuarios);

router.delete('/api/usuario/:id', eliminarUsuarios)



module.exports = router;