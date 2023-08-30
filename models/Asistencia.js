const { DataTypes, sequelize } = require('../eventodb');

const Asistencia = sequelize.define('Asistencia', {
    // Model attributes are defined here
    id_asistencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    fecha_asistencia: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado_asistencia: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'asistencia'
});

// Crear tabla si no existe ({force: true} borra y crea la tabla)
Asistencia.sync({ force: false }).then(() => {
    console.log('Tabla de Asistencias creada');
});

module.exports = Asistencia;