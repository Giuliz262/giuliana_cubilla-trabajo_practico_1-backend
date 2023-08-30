const Usuarios = require('../models/Usuario');
const ctrl = {};


// ==========================================
//         Rutas para CRUD de Usuarios
// ==========================================

// Obtener todos los Usuarios de la tabla Usuarios
// SELECT * FROM Usuarios WHERE estado=true
ctrl.obtenerUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findOne(id);
        
        return res.json(usuario);
    } catch (error) {
        console.log('Error al obtener los Usuarios', error);
        return res.status(500).json({
            message: 'Error al obtener los Usuarios'
        })
    }
}

// Obtener los datos de un Usuario a través de la Primary Key (Pk)
ctrl.obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarios = await usuarios.findOne({
            whare: {
                estado: true,
                id
            }
        });
        return res.json(usuario);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener el Usuario'
        })
    }
}


// Crear un Usuario
ctrl.crearUsuario = async (req, res) => {
    const {
        nombre,
        apellido,
        fecha_nac,
        telefono,
        email,
        estado_usuario
    } = req.body; // JSON.stringify(Usuarios);

    try {
        // Se crea una nueva instancia de Usuarios
        const nuevoUsuario = new Usuarios({
            nombre,
            apellido,
            fecha_nac,
            telefono,
            email,
            estado_usuario
        });

        // Se guarda en la BD
        await nuevoUsuario.save();

        return res.status(201).json({ message: 'Usuario creado con éxito' })
    } catch (error) {
        console.log('Error al crear el Usuarios', error);
        return res.status(500).json({ message: 'Error al crear el Usuarios' })
    }
}

// Actualizar un Usuario
ctrl.actualizarUsuarios = async (req, res) => {
    const {
        nombre,
        apellido,
        fecha_nac,
        telefono,
        email,
        estado_usuario
    
    } = req.body;

    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);
        const usuarioAct = await Usuarios.update({
        nombre,
        apellido,
        fecha_nac,
        telefono,
        email,
        estado_usuario
        },
        {
            where: {
                id_usuario : id
            }
        })
        return res.json({
            message: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        console.log('Error al actualizar el Usuario', error);
        return res.status(error.status || 500).json({
            message: error.message
        })
    }
}

// Eliminar un Usuario de forma lógica
ctrl.eliminarUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            throw({
                status: 400,
                message: 'No se ha enviado el id del Usuario'
            })
        }
        const Usuario = await Usuarios.findByPk(id);
        await Usuario.update({ estado_usuario: false });
        return res.json({ message: 'El Usuario se eliminó correctamente' })
    } catch (error) {
        console.log('Error al eliminar Usuario', error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al eliminar el Usuario'
        })
    }
}

module.exports = ctrl;