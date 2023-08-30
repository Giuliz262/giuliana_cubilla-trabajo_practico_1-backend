const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();


const { conectarDB } = require('./eventodb');

conectarDB()

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use(require('./routes/eventos.routes'));
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/asistencia.routes'));


//Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).render('404');

})


// Starting the server
app.listen(port, () => console.log(`Server on http://localhost:${port}`));