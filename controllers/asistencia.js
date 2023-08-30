const Asistencias = require('../models/Asistencia');
const ctrl = {};


// ==========================================
//         Rutas para CRUD de Asistencias
// ==========================================

// Obtener todas las Asistencias de la tabla Asistencias
// SELECT * FROM Asistencias WHERE estado=true
ctrl.obtenerAsistencias = async (req, res) => {
    try {
        const asistencias = await Asistencias.findAll();
        
        return res.json(asistencias);
    } catch (error) {
        console.log('Error al obtener las Asistencias', error);
        return res.status(500).json({
            message: 'Error al obtener las Asistencias'
        })
    }
}

// Obtener los datos de una Asistencias a través de la Primary Key (Pk)
ctrl.obtenerAsistencia = async (req, res) => {
    try {
        const { id } = req.params;
        const Asistencias = await Asistencias.findOne({
            whare: {
                estado: true,
                id
            }
        });
        return res.json(Asistencias);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener la Asistencias'
        })
    }
}


// Agregar una Asistencia
ctrl.crearAsistencia = async (req, res) => {
    const {
        id_evento,
        id_usuario,
        fecha_asistencia,
        estado_asistencia
    } = req.body; // JSON.stringify(Asistencias);

    try {
        // Se crea una nueva instancia de Asistencias
        const nuevaAsistencia = new Asistencias({
        id_evento,
        id_usuario,
        fecha_asistencia,
        estado_asistencia
        });

        // Se guarda en la BD
        await nuevaAsistencia.save();

        return res.status(201).json({ message: 'Asistencia registrada con éxito' })
    } catch (error) {
        console.log('Error al registrada la Asistencia', error);
        return res.status(500).json({ message: 'Error al crear la Asistencia' })
    }
}

// Actualizar una Asistencias
ctrl.actualizarAsistencias = async (req, res) => {
    try {
        const { id } = req.params;
        const Asistencias = await Asistencias.findByPk(id);
        await Asistencias.update(req.body)
        return res.json({
            message: 'Asistencia actualizada exitosamente'
        });
    } catch (error) {
        console.log('Error al actualizar la Asistencia', error);
        return res.status(error.status || 500).json({
            message: error.message
        })
    }
}

// Eliminar una Asistencias de forma lógica
ctrl.eliminarAsistencias = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            throw({
                status: 400,
                message: 'No se ha enviado el id de la Asistencia'
            })
        }
        const Asistencias = await Asistencias.findByPk(id);
        await Asistencias.update({ estado_asistencia: false });
        return res.json({ message: 'Asistencia se eliminó correctamente' })
    } catch (error) {
        console.log('Error al eliminar la Asistencia', error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al eliminar la Asistencia'
        })
    }
}

module.exports = ctrl;