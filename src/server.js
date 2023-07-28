require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./route/route');

const app = express();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
});

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(session({
    secret: 'affshop-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});