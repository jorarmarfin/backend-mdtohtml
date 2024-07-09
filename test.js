const express = require('express');
const {dbConnection} = require("./database/config");
const cors = require('cors');

require('dotenv').config();

const app = express();

//Base de datos
dbConnection()

//Cors
app.use(cors());

//Escuchar
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:4000');
});

//Middlewares
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/eventsRoute'));
//mkdir controllers database helpers middleware models public requests routes
//npm i express dotenv express-validator mongoose bcrypt jsonwebtoken cors
