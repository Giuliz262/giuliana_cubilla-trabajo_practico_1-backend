const { DataTypes, sequelize } = require('../eventodb');

const Evento = sequelize.define('Evento', {
    // Model attributes are defined here
    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_evento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lugar_evento: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado_evento: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'eventos'
});

// Crear tabla si no existe ({force: true} borra y crea la tabla)
Evento.sync({ force: false }).then(() => {
    console.log('Tabla de Eventos creada');
});

module.exports = Evento;