const Eventos = require('../models/Evento');
const ctrl = {};

// ==========================================
//         Rutas para CRUD de Evento
// ==========================================

// Obtener todos los Eventos de la tabla Eventos
// SELECT * FROM Eventos WHERE estado=true
ctrl.obtenerEventos = async (req, res) => {
    try {
        const evento = await Eventos.findAll();

        return res.json(evento);
    } catch (error) {
        console.log('Error al obtener el Evento', error);
        return res.status(500).json({
            message: 'Error al obtener el Evento'
        })
    }
}

// Obtener los datos de un Evento a través de la Primary Key (Pk)
ctrl.obtenerEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const Eventos = await Eventos.findOne({
            whare: {
                estado: true,
                id
            }
        });
        return res.json(Eventos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener el Evento'
        })
    }
}


// Crear un Evento
ctrl.crearEventos = async (req, res) => {
    const {
        id_usuario,
        nombre,
        fecha_evento,
        lugar_evento,
        estado_evento
    } = req.body; // JSON.stringify(Eventos);

    try {
        // Se crea una nueva instancia de Eventos
        const nuevoEvento = new Eventos({
            id_usuario,
            nombre,
            fecha_evento,
            lugar_evento,
            estado_evento
        });

        // Se guarda en la BD
        await nuevoEvento.save();

        return res.status(201).json({ message: 'Evento creado con éxito' })
    } catch (error) {
        console.log('Error al crear el Evento', error);
        return res.status(500).json({ message: 'Error al crear el Evento' })
    }
}

// Actualizar un Evento
ctrl.actualizarEventos = async (req, res) => {
    const {
        id_usuario,
        nombre,
        fecha_evento,
        lugar_evento,
        estado_evento
    
    } = req.body;

    try {
        const { id } = req.params;
        const eventos = await Eventos.findByPk(id);
        const eventoAct = await Eventos.update({
            id_usuario,
            nombre,
            fecha_evento,
            lugar_evento,
            estado_evento
        },
        {
            where: {
                id_evento : id
            }
        })
        return res.json({
            message: 'Evento actualizado exitosamente'
        });
    } catch (error) {
        console.log('Error al actualizar el Evento', error);
        return res.status(error.status || 500).json({
            message: error.message
        })
    }
}

// Eliminar un Evento de forma lógica
ctrl.eliminarEventos = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            throw({
                status: 400,
                message: 'No se ha enviado el id del Evento'
            })
        }
        const eventos = await Eventos.findByPk(id);
        await eventos.update({ estado_evento: false });
        return res.json({ message: 'Evento se eliminó correctamente' })
    } catch (error) {
        console.log('Error al eliminar el Evento', error);
        return res.status(error.status || 500).json({
            message: error.message || 'Error al eliminar el Evento'
        })
    }
}

module.exports = ctrl;