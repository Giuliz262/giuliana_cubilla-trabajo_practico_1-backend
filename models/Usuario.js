const { DataTypes, sequelize } = require('../eventodb');

const Usuario = sequelize.define('Usuario', {
    // Model attributes are defined here
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nac: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    estado_usuario: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'usuarios'
});

// Crear tabla si no existe ({force: true} borra y crea la tabla)
Usuario.sync({ force: false }).then(() => {
    console.log('Tabla de Usuarios creada');
});

module.exports = Usuario;