const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('./db/mysql');
const models = require('./models/index');
const routes = require('./routes/index');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', routes);

const listen = async () => {
    try {
        await mysql.sync();
        console.log('Database connected successfully');

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

listen();

